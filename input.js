/*eslint-disable*/

// ../core/src/files/_abstract_file.ts
var AbstractFile = class {
  constructor(filename) {
    this.filename = filename;
  }
  getFilename() {
    return this.filename;
  }
  baseName() {
    let name = this.getFilename();
    let index = name.lastIndexOf("\\");
    if (index) {
      index = index + 1;
    }
    name = name.substring(index);
    index = name.lastIndexOf("/");
    if (index) {
      index = index + 1;
    }
    return name.substring(index);
  }
  getObjectType() {
    const split = this.baseName().split(".");
    return split[1]?.toUpperCase();
  }
  getObjectName() {
    const split = this.baseName().split(".");
    split[0] = split[0].replace(/%23/g, "#");
    split[0] = split[0].replace(/%3e/g, ">");
    split[0] = split[0].replace(/%3c/g, "<");
    split[0] = split[0].toUpperCase().replace(/#/g, "/");
    split[0] = split[0].replace("(", "/");
    split[0] = split[0].replace(")", "/");
    return split[0];
  }
};

// ../core/src/files/memory_file.ts
var MemoryFile = class extends AbstractFile {
  constructor(filename, raw) {
    super(filename);
    this.raw = raw;
  }
  getRaw() {
    return this.raw;
  }
  getRawRows() {
    return this.raw.split("\n");
  }
};

// ../core/src/position.ts
var Position = class {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
  getCol() {
    return this.col;
  }
  getRow() {
    return this.row;
  }
  isAfter(p) {
    return this.row > p.row || this.row === p.row && this.col >= p.col;
  }
  equals(p) {
    return this.row === p.getRow() && this.col === p.getCol();
  }
  isBefore(p) {
    return this.row < p.row || this.row === p.row && this.col < p.col;
  }
  isBetween(p1, p2) {
    return this.isAfter(p1) && this.isBefore(p2);
  }
};

// ../core/src/virtual_position.ts
var VirtualPosition = class _VirtualPosition extends Position {
  constructor(virtual, row, col) {
    super(virtual.getRow(), virtual.getCol());
    this.vrow = row;
    this.vcol = col;
  }
  equals(p) {
    if (!(p instanceof _VirtualPosition)) {
      return false;
    }
    const casted = p;
    return super.equals(this) && this.vrow === casted.vrow && this.vcol === casted.vcol;
  }
};

// ../core/src/abap/1_lexer/tokens/abstract_token.ts
var AbstractToken = class {
  constructor(start, str) {
    this.start = start;
    this.str = str;
  }
  // special function, for debugging purposes, see https://github.com/abaplint/abaplint/pull/3137
  [Symbol.for("debug.description")]() {
    return `${this.constructor.name} ${this.str}`;
  }
  getStr() {
    return this.str;
  }
  getRow() {
    return this.start.getRow();
  }
  getCol() {
    return this.start.getCol();
  }
  getStart() {
    return this.start;
  }
  getEnd() {
    return new Position(this.start.getRow(), this.start.getCol() + this.str.length);
  }
};

// ../core/src/abap/1_lexer/tokens/at.ts
var At = class extends AbstractToken {
  static railroad() {
    return "@";
  }
};

// ../core/src/abap/1_lexer/tokens/atw.ts
var AtW = class extends AbstractToken {
  static railroad() {
    return "@ ";
  }
};

// ../core/src/abap/1_lexer/tokens/wat.ts
var WAt = class extends AbstractToken {
  static railroad() {
    return " @";
  }
};

// ../core/src/abap/1_lexer/tokens/watw.ts
var WAtW = class extends AbstractToken {
  static railroad() {
    return " @ ";
  }
};

// ../core/src/abap/1_lexer/tokens/bracket_left.ts
var BracketLeft = class extends AbstractToken {
  static railroad() {
    return "[";
  }
};

// ../core/src/abap/1_lexer/tokens/wbracket_left.ts
var WBracketLeft = class extends AbstractToken {
  static railroad() {
    return " [";
  }
};

// ../core/src/abap/1_lexer/tokens/bracket_leftw.ts
var BracketLeftW = class extends AbstractToken {
  static railroad() {
    return "[ ";
  }
};

// ../core/src/abap/1_lexer/tokens/wbracket_leftw.ts
var WBracketLeftW = class extends AbstractToken {
  static railroad() {
    return " [ ";
  }
};

// ../core/src/abap/1_lexer/tokens/bracket_right.ts
var BracketRight = class extends AbstractToken {
  static railroad() {
    return "]";
  }
};

// ../core/src/abap/1_lexer/tokens/wbracket_right.ts
var WBracketRight = class extends AbstractToken {
  static railroad() {
    return " ]";
  }
};

// ../core/src/abap/1_lexer/tokens/bracket_rightw.ts
var BracketRightW = class extends AbstractToken {
  static railroad() {
    return "] ";
  }
};

// ../core/src/abap/1_lexer/tokens/wbracket_rightw.ts
var WBracketRightW = class extends AbstractToken {
  static railroad() {
    return " ] ";
  }
};

// ../core/src/abap/1_lexer/tokens/instance_arrow.ts
var InstanceArrow = class extends AbstractToken {
  static railroad() {
    return "->";
  }
};

// ../core/src/abap/1_lexer/tokens/winstance_arrow.ts
var WInstanceArrow = class extends AbstractToken {
  static railroad() {
    return " ->";
  }
};

// ../core/src/abap/1_lexer/tokens/instance_arroww.ts
var InstanceArrowW = class extends AbstractToken {
  static railroad() {
    return "-> ";
  }
};

// ../core/src/abap/1_lexer/tokens/winstance_arroww.ts
var WInstanceArrowW = class extends AbstractToken {
  static railroad() {
    return " -> ";
  }
};

// ../core/src/abap/1_lexer/tokens/paren_left.ts
var ParenLeft = class extends AbstractToken {
  static railroad() {
    return "(";
  }
};

// ../core/src/abap/1_lexer/tokens/wparen_left.ts
var WParenLeft = class extends AbstractToken {
  static railroad() {
    return " (";
  }
};

// ../core/src/abap/1_lexer/tokens/paren_leftw.ts
var ParenLeftW = class extends AbstractToken {
  static railroad() {
    return "( ";
  }
};

// ../core/src/abap/1_lexer/tokens/wparen_leftw.ts
var WParenLeftW = class extends AbstractToken {
  static railroad() {
    return " ( ";
  }
};

// ../core/src/abap/1_lexer/tokens/paren_right.ts
var ParenRight = class extends AbstractToken {
  static railroad() {
    return ")";
  }
};

// ../core/src/abap/1_lexer/tokens/wparen_right.ts
var WParenRight = class extends AbstractToken {
  static railroad() {
    return " )";
  }
};

// ../core/src/abap/1_lexer/tokens/paren_rightw.ts
var ParenRightW = class extends AbstractToken {
  static railroad() {
    return ") ";
  }
};

// ../core/src/abap/1_lexer/tokens/wparen_rightw.ts
var WParenRightW = class extends AbstractToken {
  static railroad() {
    return " ) ";
  }
};

// ../core/src/abap/1_lexer/tokens/dash.ts
var Dash = class extends AbstractToken {
  static railroad() {
    return "-";
  }
};

// ../core/src/abap/1_lexer/tokens/wdash.ts
var WDash = class extends AbstractToken {
  static railroad() {
    return " -";
  }
};

// ../core/src/abap/1_lexer/tokens/dashw.ts
var DashW = class extends AbstractToken {
  static railroad() {
    return "- ";
  }
};

// ../core/src/abap/1_lexer/tokens/wdashw.ts
var WDashW = class extends AbstractToken {
  static railroad() {
    return " - ";
  }
};

// ../core/src/abap/1_lexer/tokens/plus.ts
var Plus = class extends AbstractToken {
  static railroad() {
    return "+";
  }
};

// ../core/src/abap/1_lexer/tokens/wplus.ts
var WPlus = class extends AbstractToken {
  static railroad() {
    return " +";
  }
};

// ../core/src/abap/1_lexer/tokens/plusw.ts
var PlusW = class extends AbstractToken {
  static railroad() {
    return "+ ";
  }
};

// ../core/src/abap/1_lexer/tokens/wplusw.ts
var WPlusW = class extends AbstractToken {
  static railroad() {
    return " + ";
  }
};

// ../core/src/abap/1_lexer/tokens/static_arrow.ts
var StaticArrow = class extends AbstractToken {
  static railroad() {
    return "=>";
  }
};

// ../core/src/abap/1_lexer/tokens/wstatic_arrow.ts
var WStaticArrow = class extends AbstractToken {
  static railroad() {
    return " =>";
  }
};

// ../core/src/abap/1_lexer/tokens/static_arroww.ts
var StaticArrowW = class extends AbstractToken {
  static railroad() {
    return "=> ";
  }
};

// ../core/src/abap/1_lexer/tokens/wstatic_arroww.ts
var WStaticArrowW = class extends AbstractToken {
  static railroad() {
    return " => ";
  }
};

// ../core/src/abap/1_lexer/tokens/string.ts
var StringToken = class extends AbstractToken {
};

// ../core/src/abap/1_lexer/tokens/string_template.ts
var StringTemplate = class extends AbstractToken {
};

// ../core/src/abap/1_lexer/tokens/string_template_begin.ts
var StringTemplateBegin = class extends AbstractToken {
};

// ../core/src/abap/1_lexer/tokens/string_template_end.ts
var StringTemplateEnd = class extends AbstractToken {
};

// ../core/src/abap/1_lexer/tokens/string_template_middle.ts
var StringTemplateMiddle = class extends AbstractToken {
};

// ../core/src/abap/1_lexer/tokens/comment.ts
var Comment = class extends AbstractToken {
};

// ../core/src/abap/1_lexer/tokens/identifier.ts
var Identifier = class extends AbstractToken {
};

// ../core/src/abap/1_lexer/tokens/pragma.ts
var Pragma = class extends AbstractToken {
};

// ../core/src/abap/1_lexer/tokens/punctuation.ts
var Punctuation = class extends AbstractToken {
};

// ../core/src/abap/1_lexer/lexer_buffer.ts
var LexerBuffer = class {
  constructor() {
    this.buf = "";
  }
  add(s) {
    this.buf = this.buf + s;
    return this.buf;
  }
  get() {
    return this.buf;
  }
  clear() {
    this.buf = "";
  }
  countIsEven(char) {
    let count = 0;
    for (let i = 0; i < this.buf.length; i += 1) {
      if (this.buf.charAt(i) === char) {
        count += 1;
      }
    }
    return count % 2 === 0;
  }
};

// ../core/src/abap/1_lexer/lexer_stream.ts
var LexerStream = class {
  constructor(raw) {
    this.offset = -1;
    this.raw = raw;
    this.row = 0;
    this.col = 0;
  }
  advance() {
    if (this.currentChar() === "\n") {
      this.col = 1;
      this.row = this.row + 1;
    }
    if (this.offset === this.raw.length) {
      return false;
    }
    this.col = this.col + 1;
    this.offset = this.offset + 1;
    return true;
  }
  getCol() {
    return this.col;
  }
  getRow() {
    return this.row;
  }
  prevChar() {
    if (this.offset - 1 < 0) {
      return "";
    }
    return this.raw.substr(this.offset - 1, 1);
  }
  prevPrevChar() {
    if (this.offset - 2 < 0) {
      return "";
    }
    return this.raw.substr(this.offset - 2, 2);
  }
  currentChar() {
    if (this.offset < 0) {
      return "\n";
    } else if (this.offset >= this.raw.length) {
      return "";
    }
    return this.raw.substr(this.offset, 1);
  }
  nextChar() {
    if (this.offset + 2 > this.raw.length) {
      return "";
    }
    return this.raw.substr(this.offset + 1, 1);
  }
  nextNextChar() {
    if (this.offset + 3 > this.raw.length) {
      return this.nextChar();
    }
    return this.raw.substr(this.offset + 1, 2);
  }
  getRaw() {
    return this.raw;
  }
  getOffset() {
    return this.offset;
  }
};

// ../core/src/abap/1_lexer/lexer.ts
var Lexer = class {
  constructor() {
    this.ModeNormal = 1;
    this.ModePing = 2;
    this.ModeStr = 3;
    this.ModeTemplate = 4;
    this.ModeComment = 5;
    this.ModePragma = 6;
  }
  run(file, virtual) {
    this.virtual = virtual;
    this.tokens = [];
    this.m = this.ModeNormal;
    this.process(file.getRaw());
    return { file, tokens: this.tokens };
  }
  add() {
    const s = this.buffer.get().trim();
    if (s.length > 0) {
      const col = this.stream.getCol();
      const row = this.stream.getRow();
      let whiteBefore = false;
      if (this.stream.getOffset() - s.length >= 0) {
        const prev = this.stream.getRaw().substr(this.stream.getOffset() - s.length, 1);
        if (prev === " " || prev === "\n" || prev === "	" || prev === ":") {
          whiteBefore = true;
        }
      }
      let whiteAfter = false;
      const next = this.stream.nextChar();
      if (next === " " || next === "\n" || next === "	" || next === ":" || next === "," || next === "." || next === "" || next === '"') {
        whiteAfter = true;
      }
      let pos = new Position(row, col - s.length);
      if (this.virtual) {
        pos = new VirtualPosition(this.virtual, pos.getRow(), pos.getCol());
      }
      let tok = void 0;
      if (this.m === this.ModeComment) {
        tok = new Comment(pos, s);
      } else if (this.m === this.ModePing || this.m === this.ModeStr) {
        tok = new StringToken(pos, s);
      } else if (this.m === this.ModeTemplate) {
        const first = s.charAt(0);
        const last = s.charAt(s.length - 1);
        if (first === "|" && last === "|") {
          tok = new StringTemplate(pos, s);
        } else if (first === "|" && last === "{" && whiteAfter === true) {
          tok = new StringTemplateBegin(pos, s);
        } else if (first === "}" && last === "|" && whiteBefore === true) {
          tok = new StringTemplateEnd(pos, s);
        } else if (first === "}" && last === "{" && whiteAfter === true && whiteBefore === true) {
          tok = new StringTemplateMiddle(pos, s);
        } else {
          tok = new Identifier(pos, s);
        }
      } else if (s.length > 2 && s.substr(0, 2) === "##") {
        tok = new Pragma(pos, s);
      } else if (s.length === 1) {
        if (s === "." || s === ",") {
          tok = new Punctuation(pos, s);
        } else if (s === "[") {
          if (whiteBefore === true && whiteAfter === true) {
            tok = new WBracketLeftW(pos, s);
          } else if (whiteBefore === true) {
            tok = new WBracketLeft(pos, s);
          } else if (whiteAfter === true) {
            tok = new BracketLeftW(pos, s);
          } else {
            tok = new BracketLeft(pos, s);
          }
        } else if (s === "(") {
          if (whiteBefore === true && whiteAfter === true) {
            tok = new WParenLeftW(pos, s);
          } else if (whiteBefore === true) {
            tok = new WParenLeft(pos, s);
          } else if (whiteAfter === true) {
            tok = new ParenLeftW(pos, s);
          } else {
            tok = new ParenLeft(pos, s);
          }
        } else if (s === "]") {
          if (whiteBefore === true && whiteAfter === true) {
            tok = new WBracketRightW(pos, s);
          } else if (whiteBefore === true) {
            tok = new WBracketRight(pos, s);
          } else if (whiteAfter === true) {
            tok = new BracketRightW(pos, s);
          } else {
            tok = new BracketRight(pos, s);
          }
        } else if (s === ")") {
          if (whiteBefore === true && whiteAfter === true) {
            tok = new WParenRightW(pos, s);
          } else if (whiteBefore === true) {
            tok = new WParenRight(pos, s);
          } else if (whiteAfter === true) {
            tok = new ParenRightW(pos, s);
          } else {
            tok = new ParenRight(pos, s);
          }
        } else if (s === "-") {
          if (whiteBefore === true && whiteAfter === true) {
            tok = new WDashW(pos, s);
          } else if (whiteBefore === true) {
            tok = new WDash(pos, s);
          } else if (whiteAfter === true) {
            tok = new DashW(pos, s);
          } else {
            tok = new Dash(pos, s);
          }
        } else if (s === "+") {
          if (whiteBefore === true && whiteAfter === true) {
            tok = new WPlusW(pos, s);
          } else if (whiteBefore === true) {
            tok = new WPlus(pos, s);
          } else if (whiteAfter === true) {
            tok = new PlusW(pos, s);
          } else {
            tok = new Plus(pos, s);
          }
        } else if (s === "@") {
          if (whiteBefore === true && whiteAfter === true) {
            tok = new WAtW(pos, s);
          } else if (whiteBefore === true) {
            tok = new WAt(pos, s);
          } else if (whiteAfter === true) {
            tok = new AtW(pos, s);
          } else {
            tok = new At(pos, s);
          }
        }
      } else if (s.length === 2) {
        if (s === "->") {
          if (whiteBefore === true && whiteAfter === true) {
            tok = new WInstanceArrowW(pos, s);
          } else if (whiteBefore === true) {
            tok = new WInstanceArrow(pos, s);
          } else if (whiteAfter === true) {
            tok = new InstanceArrowW(pos, s);
          } else {
            tok = new InstanceArrow(pos, s);
          }
        } else if (s === "=>") {
          if (whiteBefore === true && whiteAfter === true) {
            tok = new WStaticArrowW(pos, s);
          } else if (whiteBefore === true) {
            tok = new WStaticArrow(pos, s);
          } else if (whiteAfter === true) {
            tok = new StaticArrowW(pos, s);
          } else {
            tok = new StaticArrow(pos, s);
          }
        }
      }
      if (tok === void 0) {
        tok = new Identifier(pos, s);
      }
      this.tokens.push(tok);
    }
    this.buffer.clear();
  }
  process(raw) {
    this.stream = new LexerStream(raw.replace(/\r/g, ""));
    this.buffer = new LexerBuffer();
    const splits = {};
    splits[" "] = true;
    splits[":"] = true;
    splits["."] = true;
    splits[","] = true;
    splits["-"] = true;
    splits["+"] = true;
    splits["("] = true;
    splits[")"] = true;
    splits["["] = true;
    splits["]"] = true;
    splits["	"] = true;
    splits["\n"] = true;
    const bufs = {};
    bufs["."] = true;
    bufs[","] = true;
    bufs[":"] = true;
    bufs["("] = true;
    bufs[")"] = true;
    bufs["["] = true;
    bufs["]"] = true;
    bufs["+"] = true;
    bufs["@"] = true;
    for (; ; ) {
      const current = this.stream.currentChar();
      const buf = this.buffer.add(current);
      const ahead = this.stream.nextChar();
      const aahead = this.stream.nextNextChar();
      if (this.m === this.ModeNormal) {
        if (splits[ahead]) {
          this.add();
        } else if (ahead === "'") {
          this.add();
          this.m = this.ModeStr;
        } else if (ahead === "|" || ahead === "}") {
          this.add();
          this.m = this.ModeTemplate;
        } else if (ahead === "`") {
          this.add();
          this.m = this.ModePing;
        } else if (aahead === "##") {
          this.add();
          this.m = this.ModePragma;
        } else if (ahead === '"' || ahead === "*" && current === "\n") {
          this.add();
          this.m = this.ModeComment;
        } else if (ahead === "@" && buf.trim().length === 0) {
          this.add();
        } else if (aahead === "->" || aahead === "=>") {
          this.add();
        } else if (current === ">" && ahead !== " " && (this.stream.prevChar() === "-" || this.stream.prevChar() === "=")) {
          this.add();
        } else if (buf.length === 1 && (bufs[buf] || buf === "-" && ahead !== ">")) {
          this.add();
        }
      } else if (this.m === this.ModePragma && (ahead === "," || ahead === ":" || ahead === "." || ahead === " " || ahead === "\n")) {
        this.add();
        this.m = this.ModeNormal;
      } else if (this.m === this.ModePing && buf.length > 1 && current === "`" && aahead !== "``" && ahead !== "`" && this.buffer.countIsEven("`")) {
        this.add();
        if (ahead === `"`) {
          this.m = this.ModeComment;
        } else {
          this.m = this.ModeNormal;
        }
      } else if (this.m === this.ModeTemplate && buf.length > 1 && (current === "|" || current === "{") && (this.stream.prevChar() !== "\\" || this.stream.prevPrevChar() === "\\\\")) {
        this.add();
        this.m = this.ModeNormal;
      } else if (this.m === this.ModeTemplate && ahead === "}" && current !== "\\") {
        this.add();
      } else if (this.m === this.ModeStr && current === "'" && buf.length > 1 && aahead !== "''" && ahead !== "'" && this.buffer.countIsEven("'")) {
        this.add();
        if (ahead === '"') {
          this.m = this.ModeComment;
        } else {
          this.m = this.ModeNormal;
        }
      } else if (ahead === "\n" && this.m !== this.ModeTemplate) {
        this.add();
        this.m = this.ModeNormal;
      } else if (this.m === this.ModeTemplate && current === "\n") {
        this.add();
      }
      if (!this.stream.advance()) {
        break;
      }
    }
    this.add();
  }
};

// src/index.ts
function main(filename, code) {
  const file = new MemoryFile(filename, code);
  const lexer = new Lexer();
  const result = lexer.run(file);
  return JSON.stringify(result);
}

main("foo", "bar");