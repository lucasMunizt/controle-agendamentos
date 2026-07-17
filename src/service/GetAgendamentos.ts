export async function getAgendamentos() {
  const url = import.meta.env.VITE_URL_CONEXAO + "getagendas";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error("erro ao encontrar os agendamentos");
  }
}

export async function getGarantias() {
  const url = import.meta.env.VITE_URL_CONEXAO + "getgarantias";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error("erro ao encontrar as garantias");
  }
}
