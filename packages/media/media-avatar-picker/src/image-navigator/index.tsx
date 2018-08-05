import * as React from 'react';
import { Component } from 'react';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import Button from '@atlaskit/button';
import ScaleLargeIcon from '@atlaskit/icon/glyph/media-services/scale-large';
import ScaleSmallIcon from '@atlaskit/icon/glyph/media-services/scale-small';
import { ImageCropper, OnLoadHandler } from '../image-cropper';
import Slider from '@atlaskit/field-range';
import Spinner from '@atlaskit/spinner';
import {
  Container,
  SliderContainer,
  FileInput,
  ImageUploader,
  DragZone,
  DragZoneImage,
  DragZoneText,
  SelectionBlocker,
  PaddedBreak,
  ImageBg,
} from './styled';
import { uploadPlaceholder, errorIcon } from './images';
import {
  constrainPos,
  constrainScale,
  constrainEdges,
} from '../constraint-util';
import { dataURItoFile, fileSizeMb } from '../util';
import { ERROR, MAX_SIZE_MB, ACCEPT } from '../avatar-picker-dialog';
import { Ellipsify } from '@atlaskit/media-ui';
import { Rectangle, Vector2 } from '../camera';

export const CONTAINER_SIZE = akGridSizeUnitless * 32;
export const CONTAINER_INNER_SIZE = akGridSizeUnitless * 25;
export const CONTAINER_PADDING = (CONTAINER_SIZE - CONTAINER_INNER_SIZE) / 2;

// Large images (a side > CONTAINER_SIZE) will have a scale between 0 - 1.0
// Small images (a side < CONTAINER_SIZE) will have scales greater than 1.0
// Therefore the context of the slider range min-max depends on the size of the image.
// This constant is used for the max value for smaller images, as the (scale * 100) will be greater than 100.
export const MAX_SMALL_IMAGE_SCALE = 2500;

const containerRect = new Rectangle(CONTAINER_SIZE, CONTAINER_SIZE);
const containerPadding = new Vector2(CONTAINER_PADDING, CONTAINER_PADDING);

export interface CropProperties {
  x: number;
  y: number;
  size: number;
}

export interface Props {
  imageSource?: string;
  errorMessage?: string;
  onImageLoaded: (file: File, crop: CropProperties) => void;
  onLoad?: OnLoadHandler;
  onPositionChanged: (x: number, y: number) => void;
  onSizeChanged: (size: number) => void;
  onRemoveImage: () => void;
  onImageUploaded: (file: File) => void;
  onImageError: (errorMessage: string) => void;
  isLoading?: boolean;
}

export interface State {
  originalImg: Rectangle;
  imagePos: Vector2;
  imageDragStartPos: Vector2;
  cursorInitPos?: Vector2;
  scale: number;
  isDragging: boolean;
  minScale: number;
  fileImageSource?: string;
  imageFile?: File;
  isDroppingFile: boolean;
}

const defaultState = {
  originalImg: new Rectangle(0, 0),
  imagePos: containerPadding,
  minScale: 1,
  scale: 1,
  isDragging: false,
  imageDragStartPos: containerPadding,
  fileImageSource: undefined,
  isDroppingFile: false,
};

export class ImageNavigator extends Component<Props, State> {
  state: State = defaultState;

  componentWillMount() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (e: MouseEvent) => {
    if (this.state.isDragging) {
      const { imageDragStartPos, scale, originalImg } = this.state;
      const currentPos = new Vector2(e.screenX, e.screenY);
      const cursorInitPos = this.state.cursorInitPos || currentPos;
      const constrainedPos = constrainPos(
        imageDragStartPos.add(currentPos.sub(cursorInitPos)),
        originalImg,
        scale,
      );
      this.setState({
        cursorInitPos,
        imagePos: constrainedPos,
      });
    }
  };

  onMouseUp = () => {
    const { imagePos, scale } = this.state;
    this.exportImagePos(imagePos.scaled(scale).map(Math.round));
    this.setState({
      cursorInitPos: undefined,
      isDragging: false,
      imageDragStartPos: imagePos,
    });
  };

  exportSize(newScale: number): void {
    const { width, height } = this.state.originalImg;
    // adjust cropped properties by scale value
    const minSize = Math.min(width, height);
    const size =
      minSize < CONTAINER_SIZE
        ? minSize
        : Math.round(CONTAINER_INNER_SIZE / newScale);
    this.props.onSizeChanged(size);
  }

  exportImagePos(pos: Vector2): void {
    const { scale } = this.state;
    const exported = pos
      .scaled(scale)
      .sub(containerPadding)
      .scaled(1.0 / scale)
      .map(Math.abs)
      .map(Math.round);
    this.props.onPositionChanged(exported.x, exported.y);
  }

  onDragStarted = () => {
    this.setState({
      isDragging: true,
    });
  };

  /**
   * When scale change we want to zoom in/out relative to the center of the frame.
   * @param scale New scale in 0-100 format.
   */
  onScaleChange = (scale: number) => {
    const { originalImg, minScale, scale: currentScale, imagePos } = this.state;
    const newScale = constrainScale(scale / 100, minScale, originalImg);
    const scaleRelation = newScale / currentScale;
    const oldCenterPixel = containerRect.center.sub(imagePos);
    const newCenterPixel: Vector2 = oldCenterPixel.scaled(scaleRelation);
    const newPos = constrainEdges(
      containerRect.center.sub(newCenterPixel),
      originalImg,
      newScale,
    );
    const haveRenderedImage = !!originalImg.width;
    if (haveRenderedImage) {
      this.exportImagePos(newPos.scaled(1 / newScale));
      this.exportSize(newScale);
    }
    this.setState({
      scale: newScale,
      imagePos: newPos,
    });
  };

  /**
   * This gets called when the cropper loads an image
   * at this point we will be able to get the height/width
   * @param width the width of the image
   * @param height the height of the image
   */
  onImageSize = (width: number, height: number) => {
    const { imageFile, imagePos } = this.state;
    const scale = this.calculateMinScale(width, height);
    // imageFile will not exist if imageSource passed through props.
    // therefore we have to create a File, as one needs to be raised by dialog parent component when Save clicked.
    const file = imageFile || (this.dataURI && dataURItoFile(this.dataURI));
    const minSize = Math.min(width, height);
    if (file) {
      this.props.onImageLoaded(file, {
        ...imagePos,
        size: minSize,
      });
    }
    this.setState({
      originalImg: new Rectangle(width, height),
      minScale: scale,
      scale,
    });
  };

  calculateMinScale(width: number, height: number): number {
    return Math.max(
      CONTAINER_INNER_SIZE / width,
      CONTAINER_INNER_SIZE / height,
    );
  }

  validateFile(imageFile: File): string | null {
    if (ACCEPT.indexOf(imageFile.type) === -1) {
      return ERROR.FORMAT;
    } else if (fileSizeMb(imageFile) > MAX_SIZE_MB) {
      return ERROR.SIZE;
    }
    return null;
  }

  readFile(imageFile: File) {
    const reader = new FileReader();
    reader.onload = (e: Event) => {
      const fileImageSource = (e.target as FileReader).result;
      const { onImageUploaded } = this.props;

      if (onImageUploaded) {
        onImageUploaded(imageFile);
      }

      this.setState({ fileImageSource, imageFile });
    };
    reader.readAsDataURL(imageFile);
  }

  // Trick to have a nice <input /> appearance
  onUploadButtonClick = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const input = e.currentTarget.querySelector(
      '#image-input',
    ) as HTMLInputElement;

    if (input) {
      input.click();
    }
  };

  onFileChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.currentTarget.files && e.currentTarget.files.length) {
      const file = e.currentTarget.files[0];
      const validationError = this.validateFile(file);

      if (validationError) {
        this.props.onImageError(validationError);
      } else {
        this.readFile(file);
      }
    }
  };

  updateDroppingState(e: React.DragEvent<{}>, state: boolean) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ isDroppingFile: state });
  }

  onDragEnter = (e: React.DragEvent<{}>) => {
    this.updateDroppingState(e, true);
  };

  onDragOver = (e: React.DragEvent<{}>) => {
    this.updateDroppingState(e, true);
  };

  onDragLeave = (e: React.DragEvent<{}>) => {
    this.updateDroppingState(e, false);
  };

  onDrop = (e: React.DragEvent<{}>) => {
    e.stopPropagation();
    e.preventDefault();
    const dt = e.dataTransfer;
    const file = dt.files[0];
    const validationError = this.validateFile(file);

    this.setState({ isDroppingFile: false });

    if (validationError) {
      this.props.onImageError(validationError);
    } else {
      this.readFile(file);
    }
  };

  renderDragZone = () => {
    const { isDroppingFile } = this.state;
    const { errorMessage, isLoading } = this.props;
    const showBorder = !isLoading && !!!errorMessage;
    const dropZoneImageSrc = errorMessage ? errorIcon : uploadPlaceholder;
    let dragZoneText = errorMessage || 'Drag and drop your images here';
    const dragZoneAlt = errorMessage || 'Upload image';

    return (
      <DragZone
        showBorder={showBorder}
        isDroppingFile={isDroppingFile}
        onDragLeave={this.onDragLeave}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        {isLoading ? (
          <Spinner size="medium" />
        ) : (
          <div>
            <DragZoneImage src={dropZoneImageSrc} alt={dragZoneAlt} />
            <DragZoneText isFullSize={!!errorMessage}>
              <Ellipsify text={dragZoneText} lines={3} />
            </DragZoneText>
          </div>
        )}
      </DragZone>
    );
  };

  renderImageUploader() {
    const { errorMessage, isLoading } = this.props;
    const separatorText = errorMessage ? 'Try again' : 'or';

    return (
      <ImageUploader>
        {this.renderDragZone()}
        {isLoading ? null : (
          <div>
            <PaddedBreak>{separatorText}</PaddedBreak>
            <Button onClick={this.onUploadButtonClick} isDisabled={isLoading}>
              Upload a photo
              <FileInput
                type="file"
                id="image-input"
                onChange={this.onFileChange}
                accept={ACCEPT.join(',')}
              />
            </Button>
          </div>
        )}
      </ImageUploader>
    );
  }

  onRemoveImage = () => {
    this.setState(defaultState);
    this.props.onRemoveImage();
  };

  renderImageCropper(dataURI: string) {
    const { originalImg, imagePos, scale, isDragging, minScale } = this.state;
    const { onLoad, onImageError } = this.props;
    const { onDragStarted, onImageSize, onRemoveImage } = this;

    return (
      <div>
        <ImageBg />
        <ImageCropper
          scale={scale}
          imageSource={dataURI}
          imageWidth={originalImg.width}
          containerSize={CONTAINER_SIZE}
          isCircularMask={false}
          top={imagePos.y}
          left={imagePos.x}
          onDragStarted={onDragStarted}
          onImageSize={onImageSize}
          onLoad={onLoad}
          onRemoveImage={onRemoveImage}
          onImageError={onImageError}
        />
        <SliderContainer>
          <ScaleSmallIcon label="scale-small-icon" />
          <Slider
            value={scale * 100}
            min={minScale * 100}
            max={minScale > 1 ? MAX_SMALL_IMAGE_SCALE : 100}
            onChange={this.onScaleChange}
          />
          <ScaleLargeIcon label="scale-large-icon" />
        </SliderContainer>
        {isDragging ? <SelectionBlocker /> : null}
      </div>
    );
  }

  // We prioritize passed image rather than the one coming from the uploader
  private get dataURI(): string | undefined {
    const { imageSource, errorMessage } = this.props;
    const { fileImageSource } = this.state;

    return errorMessage ? undefined : imageSource || fileImageSource;
  }

  render() {
    const { isLoading } = this.props;
    const { dataURI } = this;
    const content =
      dataURI && !isLoading
        ? this.renderImageCropper(dataURI)
        : this.renderImageUploader();

    return <Container>{content}</Container>;
  }
}
