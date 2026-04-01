export default function TopTabs({
  active,
  tabs,
}: {
  active: string;
  tabs: string[];
}) {
  return (
    <div className="border-b border-ytborder">
      <div className="flex gap-8">
        {tabs.map((t) => (
          <div
            key={t}
            className={[
              "text-[12px] py-3 border-b-2",
              t === active
                ? "text-ytblue font-bold border-b-ytblue"
                : "text-slate-500 border-b-transparent",
            ].join(" ")}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
