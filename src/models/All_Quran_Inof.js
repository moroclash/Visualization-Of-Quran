import { CreateDataRow } from './Globals';

export default function All_Quran_info(swar_names, systems, tashkeels, total_char_count_in_quran, ayat_num) {
  // array of swar names
  this.swar_names = swar_names
  // dict of systems
  this.systems = systems
  // dictionary of tashkeels
  this.tashkeels = tashkeels
  this.total_char_count_in_quran = total_char_count_in_quran
  this.swar_num = swar_names.length - 1
  this.ayat_num = ayat_num
  this.systems_info = []

  Object.values(this.systems).forEach(sys => {
    this.systems_info.push(Object.keys(sys.groups).length)
  })

  this.getAllInfoForChar = function (id, system_id, char) {
    console.log(id, system_id, char)
    let AllCharInfo = this.systems[system_id].groups[char]
    return CreateDataRow(id, "ALL", "ALL", this.systems_info[system_id], char, AllCharInfo.count, AllCharInfo.tashkeel)
  }

  this.getAllInfo = function (id) {
    return CreateDataRow(id,
                         this.swar_num,
                         this.ayat_num,
                         "All",
                         "ALL",
                         this.total_char_count_in_quran,
                         this.tashkeels)
  }

}