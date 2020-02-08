// The input must contain intlCode = '+1 ' as prefix;
const checkIfPrefixIntlCodeExists = (value: string) => {
  if (!value.startsWith("+1")) {
    return false;
  };
  return true;
};

// Validate format (i.e +1 (XXX) YYY-ZZZZ)
export const checkIfFormatValid = (value: string) => {
  const matchValidFormat = value.match(/^(\+1 )\((\d{3})\) (\d{3})\-(\d{4})$/);
  if (matchValidFormat) {
    return true;
  };
  return false;
};

// Validate format during input (i.e +1 (XXX) YYY-ZZZZ)
export const validateFormat = (value: string) => {
  const intlCode = "+1 ";

  const isPrefixIntlCodeExists = checkIfPrefixIntlCodeExists(value);

  const matchExtraOpenBracket = value.match(/^(\+1 )\($/);
  if (matchExtraOpenBracket || !isPrefixIntlCodeExists) {
    const _value = intlCode;
    return _value;
  };

  const matchMissingBrackets = value.match(/^(\+1 )(\d{3})$/);
  if (matchMissingBrackets) {
    const _value = [intlCode, '(', matchMissingBrackets[2], ') '].join('');
    return _value;
  };

  const matchMissingClosingBracket = value.match(/^(\+1 )\((\d{4})$/);
  if (matchMissingClosingBracket) {
    const _value = [intlCode, '(', matchMissingClosingBracket[2].slice(0,3), ') ', matchMissingClosingBracket[2].slice(-1)].join('');
    return _value;
  };

  const matchMissingSpace = value.match(/^(\+1 )\((\d{3})\)(\d{1})$/);
  if (matchMissingSpace) {
    const _value = [intlCode, '(', matchMissingSpace[2], ') ', matchMissingSpace[3]].join('');
    return _value;
  };

  const matchMissingHyphen = value.match(/^(\+1 )\((\d{3})\) (\d{4})$/);
  if (matchMissingHyphen) {
    const _value = [intlCode, '(', matchMissingHyphen[2], ') ', matchMissingHyphen[3].slice(0,3), '-', matchMissingHyphen[3].slice(-1)].join('');
    return _value;
  };

  // In case input too fast from beginning 
  const matchValidFormatWithLength14 = value.match(/^(\+1 )(\d{10,})$/);
  if (matchValidFormatWithLength14) {
    const _value = [intlCode, '(', matchValidFormatWithLength14[2].slice(0,3), ') ', matchValidFormatWithLength14[2].slice(3,6), '-', matchValidFormatWithLength14[2].slice(6,10)].join('');
    return _value;
  };
// In case input too fast after bracket 
  const matchValidFormatAfterBracket = value.match(/^(\+1 )\((\d{3})\) (\d{7,})$/);
  if (matchValidFormatAfterBracket) {
    const _value = [intlCode, '(', matchValidFormatAfterBracket[2], ') ', matchValidFormatAfterBracket[3].slice(0,3), '-', matchValidFormatAfterBracket[3].slice(3,7)].join('');
    return _value;
  };

  // Orginial 
  // const matchValidFormat = value.match(/^(\+1 )(\d{3})(\d{3})(\d{4})$/);
  // if (matchValidFormat) {
  //   const _value = [intlCode, '(', matchValidFormat[2], ') ', matchValidFormat[3], '-', matchValidFormat[4]].join('');
  //   return _value;
  // };

  return value;
};