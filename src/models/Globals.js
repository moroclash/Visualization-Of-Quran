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

export function CreateDataRow(id, soura, aya, system, char, count, tashkeels) {
    return new RowData(id,
        soura,
        aya,
        system,
        char,
        count,
        tashkeels[AllTashkeel.fathatan],
        tashkeels[AllTashkeel.dammatan],
        tashkeels[AllTashkeel.kasratan],
        tashkeels[AllTashkeel.fatha],
        tashkeels[AllTashkeel.damma],
        tashkeels[AllTashkeel.kasra],
        tashkeels[AllTashkeel.sukun],
        tashkeels[AllTashkeel.shadda],
        tashkeels[AllTashkeel.shadaFatha],
        tashkeels[AllTashkeel.shadaKasra],
        tashkeels[AllTashkeel.shadaDama],
        tashkeels['no'],
    )

}

