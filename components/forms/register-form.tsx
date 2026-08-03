const onSubmit = async (values: FormValues) => {
  setServerError('');

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  });

  // Leemos el body como texto y luego intentamos parsearlo.
  // Si el servidor responde HTML (página 500 de Next) en vez de JSON,
  // el response.json() revienta y nunca ves el error real.
  const raw = await response.text();
  let data: { ok?: boolean; error?: string; userId?: string } = {};
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    data = { error: `El servidor respondió HTTP ${response.status} sin JSON. Revisa Vercel Logs.` };
  }

  if (!response.ok) {
    setServerError(
      typeof data.error === 'string' ? data.error : `HTTP ${response.status} sin mensaje legible.`
    );
    return;
  }

  router.push('/auth/login');
};
