import { CreateDataRow } from './Globals';

export default function Soura(soura_name, soura_num, char_count_in_soura, ayat) {
  /**
   * Sura Class 
   */
  this.soura_name = soura_name || "";
  this.soura_num = soura_num || "";
  this.char_count_in_soura = char_count_in_soura || "";
  //dict of ayat
  this.ayat = ayat || {};

  this.getAllInfoForChar = function (id, aya_id, system_id, system, char) {
    let AllCharInfo = this.ayat[aya_id].systems[system_id].groups[char]
    return CreateDataRow(id, this.soura_name, aya_id, system, char, AllCharInfo.count, AllCharInfo.tashkeel)
  }

}