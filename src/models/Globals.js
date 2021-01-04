import RowData from './RowData';

const AllTashkeel = {
    fathatan: 'ً',
    dammatan: 'ٌ',
    kasratan: 'ٍ',
    fatha: 'َ',
    damma: 'ُ',
    kasra: 'ِ',
    shadda: 'ّ',
    sukun: 'ْ',
    shadaFatha: 'َّ',
    shadaDama: 'ُّ',
    shadaKasra: 'ِّ',
}

export default AllTashkeel;


export let tashkeelOrder = [
    AllTashkeel.fathatan,
    AllTashkeel.dammatan,
    AllTashkeel.kasratan,
    AllTashkeel.fatha,
    AllTashkeel.damma,
    AllTashkeel.kasra,
    AllTashkeel.sukun,
    AllTashkeel.shadda,
    AllTashkeel.shadaFatha,
    AllTashkeel.shadaKasra,
    AllTashkeel.shadaDama,
    'no',
]

export function CreateDataRow(id, soura, aya, system, char, count, tashkeels) {
    return new RowData(id,
        soura,
        aya,
        system,
        char,
        count,
        tashkeels[tashkeelOrder[0]],
        tashkeels[tashkeelOrder[1]],
        tashkeels[tashkeelOrder[2]],
        tashkeels[tashkeelOrder[3]],
        tashkeels[tashkeelOrder[4]],
        tashkeels[tashkeelOrder[5]],
        tashkeels[tashkeelOrder[6]],
        tashkeels[tashkeelOrder[7]],
        tashkeels[tashkeelOrder[8]],
        tashkeels[tashkeelOrder[9]],
        tashkeels[tashkeelOrder[10]],
        tashkeels[tashkeelOrder[11]],
    )
}