// Utils
export const Timer = (time = 1000) => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, time)
  );
  // Timer().then(() => setLoading(false));
};
Number.prototype.toCommas = function () {
  try {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } catch (error) {
    return this;
  }
};

Number.prototype.secondsToHm = function () {
  const d = Number(this);
  if (d < 60) return `${d} seconds`;
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let hDisplay = h > 0 ? h + ' h ' : '';
  let mDisplay = m > 0 ? m + ' min' : '';
  return hDisplay + mDisplay;
};

export const replace = (array, index, replacerIndex) => {
  let results = [];
  if (array.length === 1) return array;

  try {
    results = [...array];
    results[index] = array[replacerIndex];
    results[replacerIndex] = array[index];
    return results;
  } catch (error) {
    console.log(`error`, error);
    return array;
  }
};

export const Logs = ({ message, error }) => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(`<: ${message} :>`, { error });
  return;
};
