/* Place to keep reuseable functions */
//-----------------------------------------------------------------------------
// Vietnam mobile telephone numbers
//-----------------------------------------------------------------------------
// 090, 093 - MobiFone
// 091, 094 - Vinaphone
// 092 - Vietnam Mobile (previously known as HT Mobile)
// 095 - S-Fone
// 096, 097, 098 - Viettel (096 previously EVN Telecom)
// 099 (3)(4)(5)(6)(7) - Gmobile (0996 traded as Beeline)
// 998 (8) (9) - Indochina Telecom
// 070, 079, 077, 076, 078 - MobiFone
// 083, 084, 085, 081, 082 - VinaPhone
// 032, 033, 034, 035, 036, 037, 038, 039 - Viettel
// 056, 058 - Vietnam Mobile
// 059 - Gmobile (traded as Beeline)
// 086 - MobiFone
// 088 - VinaPhone
// 089 - Viettel
//-----------------------------------------------------------------------------
// @param string mobile
// @return boolean
//-----------------------------------------------------------------------------
export const validMobile = (mobile) => {
  const regex = /^((\+?84)|0)(\d{2,3}\d{7})$/;
  return regex.test(mobile);
};

//-----------------------------------------------------------------------------
// Check the object is empty or not
//-----------------------------------------------------------------------------
export const isEmpty = (input) => {
  if (input === null || input === undefined) {
    return true;
  }
  if (typeof (input) === 'string' && input.trim() === '') {
    return true;
  }
  if (Array.isArray(input) && input.length === 0) {
    return true;
  }
  if (typeof (input) === 'object' && Object.keys(input).length === 0) {
    return true;
  }
  return false;
};
