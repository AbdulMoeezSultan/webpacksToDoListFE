const PrimaryButton = ({ name, myFunction }: PropsType) => {
  return (
    <button
      className=" border p-2 rounded-3xl bg-secondary text-lg w-32"
      onClick={myFunction}
    >
      {name}
    </button>
  )
}

type PropsType = {
  name: string
  myFunction: () => void
}

export default PrimaryButton
