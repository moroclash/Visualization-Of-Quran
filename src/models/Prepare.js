import all_quran_info_source from '../assets/Quran-content/all';
import Char from './Char';
import System from './System';
import All_Quran_info from './All_Quran_Inof';
import Aya from './Aya';
import Soura from './Soura';
import XMLParser from 'react-xml-parser';

export function getAllQuranInfo() {
    /**
     * this function to parse all information about Quran from XML at "assets/Quran-content"
     * to variable so we can use them
     */

    //parse to object
    const Quran = new XMLParser().parseFromString(all_quran_info_source)
    const QuranInfo = Quran.getElementsByTagName('Quran')[0]

    //get primitive counts
    const total_char_count_in_quran = QuranInfo.attributes['total_char_count']
    const ayat_num = QuranInfo.attributes['ayat_num']
    const swar_names = Quran.getElementsByTagName('swar_name')[0].value.split(',')
    swar_names.unshift("ALl")

    //get systems Information
    let systems = {}
    // calculate systems and their information
    // map on every system
    Quran.getElementsByTagName("count_system").forEach( (sys, key) => {
        // dict of char objects
        let chars_of_system = {}
        //map on every char in this sys to get the count of every tashkeel
        sys.value.split("|").forEach(char => {
            char = char.split('*')
            let char_name = char[0]
            let char_count = Number(char[2])
            let tashkeel_ = {}

            char[3].split(",").forEach(tashkeel => {
                let [key, count] = tashkeel.split(":")
                tashkeel_[key] = Number(count)
            })
            //push ot chars List
            chars_of_system[char_name] = new Char(char_count, tashkeel_)
        })
        //push ot systems List
        systems[key] = new System(chars_of_system)
    })

    let all_count_tashkeel = {}
    Quran.getElementsByTagName('count_tashkeel')[0].value.split(',').forEach(tashkeel => {
        let [key, value] = tashkeel.split(":")
        all_count_tashkeel[key] = Number(value)
    });

    const All_Quran_info_ = new All_Quran_info(swar_names,
        systems,
        all_count_tashkeel,
        total_char_count_in_quran,
        ayat_num)
    
    return All_Quran_info_
};
 


export async function getSouraInfo(soura_num){
    /**
     * this function to parse specific Sour information from XML at "assets/Quran-content"
     */
    let souraContent;
    try{
        souraContent = await import(`../assets/Quran-content/${soura_num}`)
    }
    catch(err){
        throw new Error('not found')
    }
    //parse to object
    let SouraInfo = new XMLParser().parseFromString(souraContent.default)

    let SouraFrequency = SouraInfo.getElementsByTagName('frequency')[0].children[0]
    let char_count_in_sura = SouraFrequency.attributes['total_char_count_in_sura']
    let sura_num = SouraFrequency.attributes['number']
    let sura_name = SouraFrequency.attributes['name']
    
    let ayat = {}
    SouraFrequency.children.forEach( (aya, aya_key) => {
        let aya_num = aya.attributes['number']
        let char_count_of_aya = Number(aya.attributes['total_char_count_in_aya'])

        let aya_chars = {}
        let aya_tashkeel = {}
        let aya_systems = {}
        
        //collect the information of characters of aya 
        aya.getElementsByTagName('count_alphabet')[0]
           .value
           .split('|')
           .forEach(chr => {
                chr = chr.split("*")
                let char_name = chr[0]
                let char_count = Number(chr[1])
                let char_tashkeel = {}

                //collect taskeel of char
                chr[2].split(',').forEach( tashkeel => {
                    let [key, value] = tashkeel.split(":")
                    char_tashkeel[key] = Number(value)
                });
                aya_chars[char_name] = new Char(char_count, char_tashkeel)
           });
        
        
        //collect tashkeel info of aya
        aya.getElementsByTagName('count_tashkeel')[0]
            .value
            .split(',')
            .forEach( tashkeel => {
                let [key, value] = tashkeel.split(":")
                aya_tashkeel[key] = Number(value)
            });

        //collect systems of aya
        aya.getElementsByTagName('count_system').forEach((system, sys_key) => {
            //collect system groups
            let groups = {}
            system.value.split("|").forEach( group => {
                group = group.split("*")
                let group_name = group[0]
                let group_count = Number(group[2])
                let group_tashkeel = {}
                
                //collect taskeel of group
                group[3].split(',').forEach( tashkeel => {
                    let [key, value] = tashkeel.split(":")
                    group_tashkeel[key] = Number(value)
                });
                groups[group_name] = new Char(group_count, group_tashkeel)
            });
            aya_systems[sys_key] = new System(groups)
        })
        ayat[Number(aya_num)] = new Aya(aya_num, char_count_of_aya, aya_chars, aya_tashkeel, aya_systems)
    })

    return new Soura(sura_name, sura_num, char_count_in_sura, ayat)
}; //end if getSouraInfo


export function getState(id, dataObj, soura_id, aya_num, system_id, system, char){
    // console.log(id, dataObj, soura_id, aya_num, system_id, system, char)
    //check if All Quran
    if(soura_id === 0){
        return dataObj.getAllInfoForChar(id, system_id, char)
    }
    //check Soura
    else{
        return dataObj.getAllInfoForChar(id, aya_num, system_id, system, char)
    }
}