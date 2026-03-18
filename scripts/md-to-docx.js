const fs = require("fs");
const path = require("path");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
} = require("docx");

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error("Usage: node md-to-docx.js <input.md> <output.docx>");
  process.exit(1);
}

const markdownContent = fs.readFileSync(inputFile, "utf-8");
const lines = markdownContent.split("\n");

function parseInlineText(text) {
  const runs = [];
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/);
  for (const part of parts) {
    if (part.startsWith("**") && part.endsWith("**")) {
      runs.push(new TextRun({ text: part.slice(2, -2), bold: true }));
    } else if (part.startsWith("`") && part.endsWith("`")) {
      runs.push(new TextRun({ text: part.slice(1, -1), font: "Courier New" }));
    } else if (part) {
      runs.push(new TextRun({ text: part }));
    }
  }
  return runs;
}

function parseTable(tableLines) {
  const rows = tableLines.filter((l) => l.trim().startsWith("|") && !l.match(/^\|[-| ]+\|$/));
  const tableRows = rows.map((row, rowIndex) => {
    const cells = row
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());
    return new TableRow({
      children: cells.map(
        (cell) =>
          new TableCell({
            children: [
              new Paragraph({
                children: parseInlineText(cell),
                alignment: AlignmentType.LEFT,
              }),
            ],
            shading: rowIndex === 0 ? { fill: "4472C4", color: "FFFFFF" } : undefined,
          })
      ),
    });
  });

  return new Table({
    rows: tableRows,
    width: { size: 100, type: WidthType.PERCENTAGE },
  });
}

const docChildren = [];
let i = 0;

while (i < lines.length) {
  const line = lines[i];

  // H1
  if (line.startsWith("# ")) {
    docChildren.push(
      new Paragraph({
        text: line.slice(2).trim(),
        heading: HeadingLevel.HEADING_1,
      })
    );
  }
  // H2
  else if (line.startsWith("## ")) {
    docChildren.push(
      new Paragraph({
        text: line.slice(3).trim(),
        heading: HeadingLevel.HEADING_2,
      })
    );
  }
  // H3
  else if (line.startsWith("### ")) {
    docChildren.push(
      new Paragraph({
        text: line.slice(4).trim(),
        heading: HeadingLevel.HEADING_3,
      })
    );
  }
  // H4
  else if (line.startsWith("#### ")) {
    docChildren.push(
      new Paragraph({
        text: line.slice(5).trim(),
        heading: HeadingLevel.HEADING_4,
      })
    );
  }
  // HR
  else if (line.trim() === "---") {
    // skip or add spacing
    docChildren.push(new Paragraph({ text: "" }));
  }
  // Table detection
  else if (line.trim().startsWith("|")) {
    const tableLines = [];
    while (i < lines.length && lines[i].trim().startsWith("|")) {
      tableLines.push(lines[i]);
      i++;
    }
    docChildren.push(parseTable(tableLines));
    docChildren.push(new Paragraph({ text: "" }));
    continue;
  }
  // Bullet list (sub)
  else if (line.match(/^    - /)) {
    docChildren.push(
      new Paragraph({
        children: parseInlineText(line.replace(/^    - /, "").trim()),
        bullet: { level: 1 },
      })
    );
  }
  // Bullet list
  else if (line.match(/^- /)) {
    docChildren.push(
      new Paragraph({
        children: parseInlineText(line.slice(2).trim()),
        bullet: { level: 0 },
      })
    );
  }
  // Numbered list (sub)
  else if (line.match(/^   \d+\. /)) {
    docChildren.push(
      new Paragraph({
        children: parseInlineText(line.replace(/^   \d+\. /, "").trim()),
        numbering: { reference: "default-numbering", level: 1 },
      })
    );
  }
  // Numbered list
  else if (line.match(/^\d+\. /)) {
    docChildren.push(
      new Paragraph({
        children: parseInlineText(line.replace(/^\d+\. /, "").trim()),
        numbering: { reference: "default-numbering", level: 0 },
      })
    );
  }
  // Empty line
  else if (line.trim() === "") {
    docChildren.push(new Paragraph({ text: "" }));
  }
  // Regular paragraph
  else {
    docChildren.push(
      new Paragraph({
        children: parseInlineText(line.trim()),
      })
    );
  }

  i++;
}

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "default-numbering",
        levels: [
          {
            level: 0,
            format: "decimal",
            text: "%1.",
            alignment: AlignmentType.LEFT,
          },
          {
            level: 1,
            format: "decimal",
            text: "%1.%2.",
            alignment: AlignmentType.LEFT,
          },
        ],
      },
    ],
  },
  sections: [
    {
      children: docChildren,
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputFile, buffer);
  console.log(`Created: ${outputFile}`);
});
