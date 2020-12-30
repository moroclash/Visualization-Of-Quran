export default function Aya(aya_num, total_char_count, count_alphabet, tashkeel_counts, systems) {
  /**
   * Aya Class
   */
  this.aya_num = aya_num;
  this.total_char_count = total_char_count;
  // array char
  this.count_alphabet = count_alphabet
  //dictionary
  this.tashkeel_counts_for_aya = tashkeel_counts

  //array of system
  this.systems = systems
}