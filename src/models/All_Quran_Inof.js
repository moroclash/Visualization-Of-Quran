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

  this.getAllInfoForChars = function (id, system_id, chars) {
    let all_Tashkeel_Counts_for_char = {}
    let system = this.systems[system_id]
    let total_char_count = 0
    chars.forEach(char => {
      let AllCharInfo = system.groups[char]
      total_char_count += AllCharInfo.count
      Object.keys(AllCharInfo.tashkeel).forEach(key => {
          if (all_Tashkeel_Counts_for_char[key])
            all_Tashkeel_Counts_for_char[key] += AllCharInfo.tashkeel[key]
          else
            all_Tashkeel_Counts_for_char[key] = AllCharInfo.tashkeel[key]
        })
    })
    return CreateDataRow(id, "الكل", "الكل", '**', chars.join(','), total_char_count, all_Tashkeel_Counts_for_char)
  }

  this.getAllInfo = function (id) {
    return CreateDataRow(id,
                         this.swar_num,
                         this.ayat_num,
                         "الكل",
                         "الكل",
                         this.total_char_count_in_quran,
                         this.tashkeels)
  }

}