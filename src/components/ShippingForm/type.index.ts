import { Country, SelectOptionValue } from '@/lib/type';

export type FieldType = {
  negara?: string;
  pelabuhan?: string;
  barang?: string;
  discount?: string;
  harga?: string;
  total?: string;
};

export type FormValue = {
  negara: Country[];
  pelabuhan: any
};

export type SelectedFormValue = {
  negara: number;
};
