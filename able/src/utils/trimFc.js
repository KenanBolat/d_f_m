// ==============================|| CUSTOM FUNCTION - STRING TRIM ||============================== //

function ltrim(str) {
  if (!str) return str;
  return str.replace(/^\s+/g, '');
}

function rtrim(str) {
  if (!str) return str;
  return str.replace(/\s+$/g, ' ');
}

export default function trimFc(formik) {
  return (e) => {
    const ff = ltrim(rtrim(e.target.value));
    formik.setFieldValue(e.target.name, ff);
  };
}
