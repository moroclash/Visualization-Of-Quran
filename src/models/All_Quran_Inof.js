export default function All_Quran_info(swar_names, systems, tashkeels, total_char_count_in_quran, ayat_num) {
  // array of swar names
  this.swar_names = swar_names
  // array of chars
  this.systems = systems
  // dictionary of tashkeels
  this.tashkeels = tashkeels
  this.total_char_count_in_quran = total_char_count_in_quran
  this.swar_num = swar_names.length - 1
  this.ayat_num = ayat_num
  this.systems_info = []

  this.systems.map(sys => {
    this.systems_info.push(sys.groups.length)
  })

}