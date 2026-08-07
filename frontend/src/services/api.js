const API_URL = "http://127.0.0.1:8000";

export async function getCPUs() {
  const response = await fetch(`${API_URL}/cpus`);
  return response.json();
}

export async function getGPUs() {
  const response = await fetch(`${API_URL}/gpus`);
  return response.json();
}

export async function getMotherboards() {
  const response = await fetch(`${API_URL}/motherboards`);
  return response.json();
}

export async function getRAMs() {
  const response = await fetch(`${API_URL}/rams`);
  return response.json();
}

export async function getStorages() {
  const response = await fetch(`${API_URL}/storages`);
  return response.json();
}

export async function getPSUs() {
  const response = await fetch(`${API_URL}/psus`);
  return response.json();
}

export async function buildPC(data) {
  const params = new URLSearchParams(data);

  const response = await fetch(
    `${API_URL}/build?${params.toString()}`
  );

  return response.json();
}

export async function generateBuild(budget, purpose) {
  const response = await fetch(
    `${API_URL}/generate?budget=${budget}&purpose=${purpose}`
  );

  return response.json();
}

export async function compareCPUs(id1, id2) {
  const response = await fetch(
    `${API_URL}/compare/cpu?id1=${id1}&id2=${id2}`
  );

  return response.json();
}

export async function compareGPUs(id1, id2) {
  const response = await fetch(
    `${API_URL}/compare/gpu?id1=${id1}&id2=${id2}`
  );

  return response.json();
}

export async function saveBuild(build) {

  const response = await fetch(
    `${API_URL}/saved-builds`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(build)
    }
  );

  const data = await response.json();

  console.log("STATUS:", response.status);
  console.log("RESPONSE:", data);

  return data;
}

export async function getSavedBuilds() {
  const response = await fetch(
    `${API_URL}/saved-builds`
  );

  return response.json();
}

export async function deleteSavedBuild(id) {
  const response = await fetch(
    `${API_URL}/saved-builds/${id}`,
    {
      method: "DELETE"
    }
  );

  return response.json();
}