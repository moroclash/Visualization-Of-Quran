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



  this.getAllInfoForAyaChars = function (id, aya_id, system_id, chars) {
    let system = this.ayat[aya_id].systems[system_id]
    let all_Tashkeel_Counts_for_char = {}
    let total_char_count = 0
    chars.forEach(char => {
      let char_of_system = system.groups[char]
      total_char_count += char_of_system.count
      Object.keys(char_of_system.tashkeel).forEach(key => {
        if (all_Tashkeel_Counts_for_char[key])
          all_Tashkeel_Counts_for_char[key] += char_of_system.tashkeel[key]
        else
          all_Tashkeel_Counts_for_char[key] = char_of_system.tashkeel[key]
      })
    })

    return CreateDataRow(id, this.soura_name, aya_id, '***', chars.join(','), total_char_count, all_Tashkeel_Counts_for_char)
  }


  this.getAllInfoForAya = function (id, aya_id) {
    let aya = this.ayat[aya_id]
    return CreateDataRow(id,
      this.soura_name,
      aya_id,
      "الكل",
      "الكل",
      aya.total_char_count,
      aya.tashkeel_counts_for_aya)
  }

  this.getAllInfoForAll = function (id) {
    let all_Tashkeel_Counts_In_System = {}
    Object.keys(this.ayat).forEach(ayaKey => {
      let aya = this.ayat[ayaKey]
      Object.keys(aya.tashkeel_counts_for_aya).forEach(key => {
        if (all_Tashkeel_Counts_In_System[key])
          all_Tashkeel_Counts_In_System[key] += aya.tashkeel_counts_for_aya[key]
        else
          all_Tashkeel_Counts_In_System[key] = aya.tashkeel_counts_for_aya[key]
      })
    })

    return CreateDataRow(id,
      this.soura_name,
      Object.keys(ayat).length,
      "الكل",
      "الكل",
      this.char_count_in_soura,
      all_Tashkeel_Counts_In_System)
  }

  this.getAllInfoForChars = function (id, system_id, chars) {
    let all_Tashkeel_Counts_for_char = {}
    let total_char_count = 0
    Object.values(this.ayat).forEach(aya => {
      let system = aya.systems[system_id]
      chars.forEach(char => {
        let char_of_system = system.groups[char]
        total_char_count += char_of_system.count
        Object.keys(char_of_system.tashkeel).forEach(key => {
          if (all_Tashkeel_Counts_for_char[key])
            all_Tashkeel_Counts_for_char[key] += char_of_system.tashkeel[key]
          else
            all_Tashkeel_Counts_for_char[key] = char_of_system.tashkeel[key]
        })
      })
    })

    return CreateDataRow(id,
      this.soura_name,
      "الكل",
      '***',
      chars.join(','),
      total_char_count,
      all_Tashkeel_Counts_for_char)
  }

}
