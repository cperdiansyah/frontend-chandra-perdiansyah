import { Country, Product, SelectOptionValue } from '@/lib/type';
import { Harbor } from '../../lib/type';

export type FieldType = {
  negara?: string;
  pelabuhan?: string;
  barang?: string;
  discount?: string;
  harga?: string;
  total?: string;
  barangDetail?: string;
};

export type FormValue = {
  originalData: {
    negara: Country[];
    pelabuhan: Harbor[];
    barang: Product[];
  };
  formData: {
    negara: SelectOptionValue[];
    pelabuhan: SelectOptionValue[];
    barang: SelectOptionValue[];
  };
};

export type SelectedFormValue = {
  negara: string;
  pelabuhan: string;
  barang: string;
};
