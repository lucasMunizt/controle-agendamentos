export function FormatarData(data: string) {
  if (!data) return "";

  // Caso venha apenas no formato YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}-${mes}-${ano}`;
  }

  const dataConvertida = new Date(data);

  if (Number.isNaN(dataConvertida.getTime())) {
    return "Data inválida";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/Fortaleza",
  })
    .format(dataConvertida)
    .replaceAll("/", "-");
}
//formata horas
export const FormateHoras = (data: string) => {
  const dataConvertida = new Date(data);
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Fortaleza",
  })
    .format(dataConvertida)
    .replace("/", "-");
};

export const FormatarMoeda = (valor: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};
