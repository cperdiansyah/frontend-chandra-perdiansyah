export type SelectOptionValue = {
  value?: string;
  label?: string;
};
export type Country = {
  id_negara: number;
  kode_negara: string;
  nama_negara: string;
};

export type Harbor = {
  id_pelabuhan: string;
  nama_pelabuhan: string;
  id_negara: string;
};

export type Product = {
  id_barang: number;
  nama_barang: string;
  id_pelabuhan: number;
  description: string;
  diskon: number;
  harga: number;
};
