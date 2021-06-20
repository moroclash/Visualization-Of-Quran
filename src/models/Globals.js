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


export let HeadNames = [['#', 0, 'id'],
["السوره", 1, 'souraName'],
['الآية', 1, 'aya'],
// ['النظام', 0, 'system'],
["الحرف", 1, 'char'],
["العدد", 1, 'count'],
["img:1", 0, tashkeelOrder[0]],
["img:2", 0, tashkeelOrder[1]],
["img:3", 0, tashkeelOrder[2]],
["img:4", 0, tashkeelOrder[3]],
["img:5", 0, tashkeelOrder[4]],
["img:6", 0, tashkeelOrder[5]],
["img:7", 0, tashkeelOrder[6]],
["img:8", 0, tashkeelOrder[7]],
["img:9", 0, tashkeelOrder[8]],
["img:10", 0, tashkeelOrder[9]],
["img:11", 0, tashkeelOrder[10]],
["img:12", 0, tashkeelOrder[11]],
["", 0, "dbtn:"],
];

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