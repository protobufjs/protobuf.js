/*
  Copyright 2012 the Catharsis Authors.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

const Types = require('./types');

function combineNameAndType(nameString, typeString) {
  const separator = nameString && typeString ? ':' : '';

  return nameString + separator + typeString;
}

class Stringifier {
  constructor(options) {
    this._options = options || {};
  }

  applications(applications) {
    let result = '';
    const strings = [];

    if (!applications) {
      return result;
    }

    for (let i = 0, l = applications.length; i < l; i++) {
      strings.push(this.type(applications[i]));
    }
    result = strings.join(', ');

    if (this._options.htmlSafe) {
      return `&lt;${result}&gt;`;
    }

    return `<${result}>`;
  }

  elements(elements) {
    let result = '';
    const strings = [];

    if (!elements) {
      return result;
    }

    for (let i = 0, l = elements.length; i < l; i++) {
      strings.push(this.type(elements[i]));
    }

    result = `(${strings.join('|')})`;

    return result;
  }

  key(type) {
    return this.type(type);
  }

  name(name) {
    return name || '';
  }

  new(funcNew) {
    return funcNew ? `new:${this.type(funcNew)}` : '';
  }

  nullable(nullable) {
    switch (nullable) {
      case true:
        return '?';
      case false:
        return '!';
      default:
        return '';
    }
  }

  optional(optional) {
    if (optional === true) {
      return '=';
    } else {
      return '';
    }
  }

  params(params) {
    let result = '';
    const strings = [];

    if (!params || params.length === 0) {
      return result;
    }

    for (let i = 0, l = params.length; i < l; i++) {
      strings.push(this.type(params[i]));
    }

    result = strings.join(', ');

    return result;
  }

  result(result) {
    return result ? `: ${this.type(result)}` : '';
  }

  stringify(type) {
    return this.type(type);
  }

  this(funcThis) {
    return funcThis ? `this:${this.type(funcThis)}` : '';
  }

  type(type) {
    let typeString = '';

    if (!type) {
      return typeString;
    }

    switch (type.type) {
      case Types.AllLiteral:
        typeString = this._formatNameAndType(type, '*');
        break;
      case Types.FunctionType:
        typeString = this._signature(type);
        break;
      case Types.NullLiteral:
        typeString = this._formatNameAndType(type, 'null');
        break;
      case Types.RecordType:
        typeString = this._record(type);
        break;
      case Types.TypeApplication:
        typeString = this.type(type.expression) + this.applications(type.applications);
        break;
      case Types.UndefinedLiteral:
        typeString = this._formatNameAndType(type, 'undefined');
        break;
      case Types.TypeUnion:
        typeString = this.elements(type.elements);
        break;
      case Types.UnknownLiteral:
        typeString = this._formatNameAndType(type, '?');
        break;
      default:
        typeString = this._formatNameAndType(type);
    }

    // add optional/nullable/repeatable modifiers
    if (!this._options._ignoreModifiers) {
      typeString = this._addModifiers(type, typeString);
    }

    return typeString;
  }

  _record(type) {
    const fields = this._recordFields(type.fields);

    return `{${fields.join(', ')}}`;
  }

  _recordFields(fields) {
    let field;
    let keyAndValue;

    const result = [];

    if (!fields) {
      return result;
    }

    for (let i = 0, l = fields.length; i < l; i++) {
      field = fields[i];

      keyAndValue = this.key(field.key);
      keyAndValue += field.value ? `: ${this.type(field.value)}` : '';

      result.push(keyAndValue);
    }

    return result;
  }

  // Adds optional, nullable, and repeatable modifiers if necessary.
  _addModifiers(type, typeString) {
    let combined;

    let optional = '';
    let repeatable = '';

    if (type.repeatable) {
      repeatable = '...';
    }

    combined = this.nullable(type.nullable) + combineNameAndType('', typeString);
    optional = this.optional(type.optional);

    return repeatable + combined + optional;
  }

  _addLinks(nameString) {
    const href = this._getHrefForString(nameString);
    let link = nameString;
    let linkClass = this._options.linkClass || '';

    if (href) {
      if (linkClass) {
        linkClass = ` class="${linkClass}"`;
      }

      link = `<a href="${href}"${linkClass}>${nameString}</a>`;
    }

    return link;
  }

  _formatNameAndType(type, literal) {
    let nameString = type.name || literal || '';
    const typeString = type.type ? this.type(type.type) : '';

    nameString = this._addLinks(nameString);

    return combineNameAndType(nameString, typeString);
  }

  _getHrefForString(nameString) {
    let href = '';
    const links = this._options.links;

    if (!links) {
      return href;
    }

    // Accept a map-like object or a dictionary-style object.
    if (typeof links?.get === 'function') {
      href = links.get(nameString);
    } else if ({}.hasOwnProperty.call(links, nameString)) {
      href = links[nameString];
    }

    return href;
  }

  _signature(type) {
    let param;
    let prop;
    let signature;

    const params = [];
    // these go within the signature's parens, in this order
    const props = ['new', 'this', 'params'];

    for (let i = 0, l = props.length; i < l; i++) {
      prop = props[i];
      param = this[prop](type[prop]);
      if (param.length > 0) {
        params.push(param);
      }
    }

    signature = `function(${params.join(', ')})`;
    signature += this.result(type.result);

    return signature;
  }
}

module.exports = (type, options) => new Stringifier(options).stringify(type);
