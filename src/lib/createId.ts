let id: any = '';

// parseInt(window.localStorage.getItem('_idMax') || '0') || 0;

function createId(hashLength?: number) {
  // id++
  id = Array.from(Array(Number(hashLength) || 24), () => Math.floor(Math.random() * 36).toString(36)).join('');
  return id;
}

export default createId;