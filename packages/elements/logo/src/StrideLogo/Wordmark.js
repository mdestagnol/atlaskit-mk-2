// @flow
/* eslint-disable max-len */
import React, { Component } from 'react';

import { type Props, DefaultProps } from '../constants';
import Wrapper from '../styledWrapper';

const svg = `<canvas height="32" width="65" aria-hidden="true"></canvas>
<svg viewBox="0 0 65 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
  <g stroke="none" stroke-width="1" fill-rule="evenodd" fill="inherit">
    <path d="M12.1672398,19.2931423 C12.1672398,16.225334 10.1393665,15.0554071 6.52559228,14.145464 C3.50978071,13.3915111 2.41784893,12.6895549 2.41784893,11.2856426 C2.41784893,9.7257401 3.74376609,8.94578883 5.9796264,8.94578883 C7.74751594,8.94578883 9.59340061,9.25776934 11.3092934,10.2457076 L11.3092934,7.90585381 C10.1393665,7.25589442 8.55346558,6.65793178 6.0836199,6.65793178 C2.10586843,6.65793178 0.0779951269,8.63380832 0.0779951269,11.2856426 C0.0779951269,14.0934672 1.79388792,15.4193844 5.64164751,16.3553259 C8.89144447,17.1352772 9.82738599,17.9412268 9.82738599,19.4491326 C9.82738599,20.9570384 8.86544609,21.970975 6.2916069,21.970975 C4.02974822,21.970975 1.58590091,21.3730124 1.55431223e-14,20.5410644 L1.55431223e-14,22.9329149 C1.32591716,23.6088727 2.85982132,24.2588321 6.16161502,24.2588321 C10.3993503,24.2588321 12.1672398,22.2569572 12.1672398,19.2931423 Z M18.0168743,19.891105 L18.0168743,13.0795306 L21.4746583,13.0795306 L21.4746583,10.9996605 L18.0168743,10.9996605 L18.0168743,8.24383269 L15.8330108,8.24383269 L15.8330108,10.9996605 L13.7271423,10.9996605 L13.7271423,13.0795306 L15.8330108,13.0795306 L15.8330108,19.9431017 C15.8330108,22.3609507 17.1849263,23.9988483 19.9667525,23.9988483 C20.6427103,23.9988483 21.0846826,23.8948548 21.4746583,23.7908613 L21.4746583,21.6329961 C21.0846826,21.7109913 20.5907135,21.8149848 20.070746,21.8149848 C18.6928321,21.8149848 18.0168743,21.0350335 18.0168743,19.891105 Z M24.3344796,23.9988483 L26.5183431,23.9988483 L26.5183431,16.3293275 C26.5183431,13.5734997 28.2602343,12.7155533 31.1200556,13.0015354 L31.1200556,10.8176719 C28.5722148,10.6616816 27.272296,11.7536134 26.5183431,13.2875176 L26.5183431,10.9996605 L24.3344796,10.9996605 L24.3344796,23.9988483 Z M32.6279614,7.56787492 C32.6279614,8.5558132 33.2779208,9.12777746 34.187864,9.12777746 C35.0978071,9.12777746 35.7477665,8.5558132 35.7477665,7.56787492 C35.7477665,6.57993665 35.0978071,6.00797239 34.187864,6.00797239 C33.2779208,6.00797239 32.6279614,6.57993665 32.6279614,7.56787492 Z M33.0439354,23.9988483 L35.2797957,23.9988483 L35.2797957,10.9996605 L33.0439354,10.9996605 L33.0439354,23.9988483 Z M47.4730339,23.9988483 L47.4730339,21.6589945 C46.6410859,23.3748873 45.0811833,24.2588321 43.0793084,24.2588321 C39.6215245,24.2588321 37.8796333,21.3210156 37.8796333,17.4992544 C37.8796333,13.8334835 39.6995196,10.7396768 43.3392922,10.7396768 C45.2371736,10.7396768 46.6930826,11.5976231 47.4730339,13.2875176 L47.4730339,5.566 L49.7088942,5.566 L49.7088942,23.9988483 L47.4730339,23.9988483 Z M40.1154936,17.4992544 C40.1154936,20.6190595 41.3634156,22.178962 43.6772711,22.178962 C45.679146,22.178962 47.4730339,20.9050416 47.4730339,18.0192219 L47.4730339,16.9792869 C47.4730339,14.0934672 45.8351362,12.8195468 43.9372548,12.8195468 C41.4154124,12.8195468 40.1154936,14.4834428 40.1154936,17.4992544 Z M63.332043,23.4788808 C62.2661096,24.0508451 60.628212,24.2588321 59.3022948,24.2588321 C54.4405986,24.2588321 52.3087318,21.4510075 52.3087318,17.473256 C52.3087318,13.5475013 54.4925953,10.7396768 58.4443484,10.7396768 C62.4480983,10.7396768 64.0599976,13.5215029 64.0599976,17.473256 L64.0599976,18.4871927 L54.5705905,18.4871927 C54.882571,20.6970546 56.3124816,22.1269653 59.3802899,22.1269653 C60.8881957,22.1269653 62.1621161,21.8409831 63.332043,21.4250091 L63.332043,23.4788808 Z M58.3403549,12.7675501 C55.9745027,12.7675501 54.7785775,14.3014542 54.5445921,16.5633129 L61.7981389,16.5633129 C61.668147,14.145464 60.5762152,12.7675501 58.3403549,12.7675501 Z"></path>
  </g>
</svg>`;

export default class StrideWordmark extends Component<Props> {
  static defaultProps = DefaultProps;

  render() {
    const { label } = this.props;
    return (
      <Wrapper
        aria-label={label}
        dangerouslySetInnerHTML={{ __html: svg }}
        {...this.props}
      />
    );
  }
}
