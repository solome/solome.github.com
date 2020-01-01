export default function (...args) {
  const img = new Image()
  img.src = `/log/?json=${JSON.stringify(arguments)}`
  console.log('log ➜ ', JSON.parse(JSON.stringify(args)))
}

