function TextDescription({ text, className = "" }) {
  return (
    <p className={`text-gray-600 text-sm tracking-wide leading-6 ${className}`}>
      {text}
    </p>
  );
}

export default TextDescription 