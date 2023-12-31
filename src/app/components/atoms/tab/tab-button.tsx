export default function TabButton(props: { tab: string; focus: boolean }) {
    return (
      <div className="text-2xl">
        <p
          className={`inline-block px-5 pb-0.1 transition-all duration-300 ${
            props.focus
              ? 'text-azure-blue border-b-2 border-azure-blue transform scale-105'
              : 'text-soft-black opacity-75 hover:text-azure-blue hover:border-azure-blue transform hover:scale-105'
          }`}
        >
          {props.tab}
        </p>
      </div>
    );
  }