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

  this.getAllInfoForAya = function (id, aya_id){
      let aya = this.ayat[aya_id]
      return CreateDataRow(id,
                           this.soura_name,
                           aya_id,
                           "ALL",
                           "All",
                           aya.total_char_count,
                           aya.tashkeel_counts_for_aya)
  }

  this.getAllInfoForAll = function (id) {
    let all_Tashkeel_Counts_In_System = {}
    Object.keys(this.ayat).forEach(ayaKey => {
        let aya = this.ayat[ayaKey]
        Object.keys(aya.tashkeel_counts_for_aya).forEach( key => {
          if(all_Tashkeel_Counts_In_System[key])
            all_Tashkeel_Counts_In_System[key] += aya.tashkeel_counts_for_aya[key]
          else
            all_Tashkeel_Counts_In_System[key] = aya.tashkeel_counts_for_aya[key]
        })
    })

    return CreateDataRow(id,
                         this.soura_name,
                         Object.keys(ayat).length,
                         "ALL",
                         "All",
                         this.char_count_in_soura,
                         all_Tashkeel_Counts_In_System)
  }
}