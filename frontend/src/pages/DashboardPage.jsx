export default function DashboardPage() {
  const cards = [
    {
      title: "จำนวนถังดับเพลิงทั้งหมด",
      value: "256",
      color: "bg-blue-600",
    },
    {
      title: "ถังที่ยังไม่ได้ตรวจประจำเดือนนี้",
      value: "42",
      color: "bg-yellow-500",
    },
    {
      title: "ถังหมดอายุการใช้งาน",
      value: "8",
      color: "bg-red-500",
    },
    {
      title: "ถังที่ผ่านการตรวจเรียบร้อย",
      value: "206",
      color: "bg-green-600",
    },
  ];

  const nextInspection = [
    { area: "อาคารสำนักงาน", date: "15 พ.ย. 2568", status: "รอตรวจ" },
    { area: "คลังสินค้า A", date: "20 พ.ย. 2568", status: "รอตรวจ" },
    { area: "โรงงานผลิต", date: "25 พ.ย. 2568", status: "ตรวจแล้ว" },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 my-2">Dashboard ระบบตรวจเช็คถังดับเพลิง 🔥</h1>

      {/* ✅ Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`rounded-lg shadow-md p-5 text-white flex flex-col justify-between transition transform hover:scale-[1.02] hover:shadow-lg ${card.color}`}
          >
            <div className="text-sm opacity-90">{card.title}</div>
            <div className="text-3xl font-bold mt-2">{card.value}</div>
          </div>
        ))}
      </div>

      {/* ✅ ตารางกำหนดตรวจ */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">ตารางตรวจถังดับเพลิงรอบถัดไป</h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="p-3 border-b">พื้นที่</th>
              <th className="p-3 border-b">วันที่ตรวจ</th>
              <th className="p-3 border-b">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {nextInspection.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition border-b text-gray-700">
                <td className="p-3">{item.area}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">
                  {item.status === "รอตรวจ" ? (
                    <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700 font-medium">รอตรวจ</span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700 font-medium">ตรวจแล้ว</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
