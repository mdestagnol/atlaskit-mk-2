import { Transaction } from 'prosemirror-state';
import { Node as PMNode } from 'prosemirror-model';

const fixTable = (
  table: PMNode,
  tablePos: number,
  tr: Transaction,
): Transaction => {
  const rows: PMNode[] = [];
  let hasProblems = false;

  // detect if table has empty rows that we need to remove
  for (let i = 0; i < table.childCount; i++) {
    if (!table.child(i).childCount) {
      hasProblems = true;
      break;
    }
  }

  if (!hasProblems) {
    return tr;
  }

  for (let rowIndex = 0; rowIndex < table.childCount; rowIndex++) {
    const row = table.child(rowIndex);
    if (row.childCount) {
      rows.push(row);
    } else {
      for (let j = rows.length - 1; j >= 0; j--) {
        const cells: PMNode[] = [];
        const rowToFix = rows[j];

        for (let colIndex = 0; colIndex < rowToFix.childCount; colIndex++) {
          const cell = rowToFix.child(colIndex);
          const { rowspan } = cell.attrs;
          if (rowspan + j - 1 >= rows.length) {
            cells.push(
              cell.type.createChecked(
                {
                  ...cell.attrs,
                  rowspan: cell.attrs.rowspan - 1,
                },
                cell.content,
                cell.marks,
              ),
            );
          } else {
            cells.push(cell);
          }
        }
        // re-create the row with decremented rowspans @see ED-5802
        rows[j] = row.type.createChecked(row.attrs, cells, row.marks);
      }
    }
  }

  const newTable = table.type.createChecked(table.attrs, rows, table.marks);
  return tr.replaceWith(tablePos, tablePos + table.nodeSize, newTable);
};

export const fixTables = (tr: Transaction): Transaction => {
  tr.doc.descendants((node, pos) => {
    if (node.type.name === 'table') {
      tr = fixTable(node, pos, tr);
    }
  });
  return tr;
};
