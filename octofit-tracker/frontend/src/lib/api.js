const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://127.0.0.1:8000';
};

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.docs)) {
    return payload.docs;
  }

  return [];
};

const fetchResource = async (resource) => {
  const baseUrl = getApiBaseUrl();
  const candidates = [`${baseUrl}/api/${resource}/`, `${baseUrl}/api/${resource}`];

  for (const candidate of candidates) {
    try {
      const response = await fetch(candidate, {
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        return response.json();
      }

      if (response.status === 404) {
        continue;
      }

      throw new Error(`Request failed with status ${response.status}`);
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        throw error;
      }
    }
  }

  throw new Error(`Unable to load ${resource} from ${baseUrl}`);
};

export { fetchResource, getApiBaseUrl, normalizeItems };
