import { useState } from "react";
import { PlusIcon, FireIcon, XMarkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Select from "react-select";

export default function ExtinguisherListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [extinguishers, setExtinguishers] = useState([
    { id: 1, type: "Co2", location: "อาคารสำนักงาน ชั้น 1", status: "ปกติ" },
    { id: 2, type: "Dry Chemical", location: "คลังสินค้า A", status: "รอตรวจ" },
    { id: 3, type: "Foam", location: "โรงงานผลิต", status: "หมดอายุ" },
  ]);

  const [formData, setFormData] = useState({
    type: "",
    size: "",
    image: null,
    location: "",
    responsible: "",
    properties: "",
  });

  const extinguisherOptions = [
    { value: "1", label: "Dry Chemical" },
    { value: "2", label: "Co2" },
    { value: "3", label: "Foam" },
    { value: "4", label: "Halotron" },
  ];

  const userOptions = [
    { value: "สมชาย", label: "สมชาย" },
    { value: "สมหญิง", label: "สมหญิง" },
    { value: "ประเสริฐ", label: "ประเสริฐ" },
    { value: "อารีย์", label: "อารีย์" },
  ];

  const handleAdd = (e) => {
    e.preventDefault();
    const newItem = {
      id: extinguishers.length + 1,
      ...formData,
      status: "รอตรวจ",
    };
    setExtinguishers([...extinguishers, newItem]);
    setFormData({
      type: "",
      size: "",
      image: null,
      location: "",
      responsible: "",
      properties: "",
    });
    setIsModalOpen(false);
  };

  const openModal = () => {
  setFormData({
    type: "",
    size: "",
    image: null,
    location: "",
    responsible: "",
    properties: "",
  });
  setIsModalOpen(true);
};

  

  return (
    <div>
      {/* 🔹 Header + Add Button */}
      <div className="flex justify-between items-center my-4">
        <h1 className="text-xl text-gray-800 flex items-center gap-2">
          <FireIcon className="h-7 w-7 text-red-600" />
          รายการถังดับเพลิง
        </h1>

        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-3 py-2 rounded shadow transition"
        >
          <PlusIcon className="h-5 w-5 text-white" />
          เพิ่มถังดับเพลิง
        </button>
      </div>

      {/* 🔹 ตารางรายการ */}
      <div className="bg-white shadow rounded-lg p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="p-3 border-b">ประเภท</th>
              <th className="p-3 border-b">สถานที่ตั้ง</th>
              <th className="p-3 border-b">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {extinguishers.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition border-b text-gray-700">
                <td className="p-3">{item.type}</td>
                <td className="p-3">{item.location}</td>
                <td className="p-3">
                  {item.status === "ปกติ" && (
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700 font-medium">ปกติ</span>
                  )}
                  {item.status === "รอตรวจ" && (
                    <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700 font-medium">รอตรวจ</span>
                  )}
                  {item.status === "หมดอายุ" && (
                    <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700 font-medium">หมดอายุ</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Modal - Improved UI */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
            {/* 🔸 Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-blue-800 text-white">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-semibold">เพิ่มถังดับเพลิงใหม่</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="hover:bg-white hover:bg-opacity-20 p-1.5 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* 🔸 Form แยกส่วน scroll กับ footer */}
            <form onSubmit={handleAdd} className="flex flex-col flex-1">
              {/* Scrollable Body */}
              <div
                className="flex-1 overflow-y-auto pl-5 pr-4 py-6 space-y-5"
                style={{
                  maxHeight: "calc(90vh - 180px)",
                  scrollbarWidth: "thin", // Firefox
                  scrollbarColor: "#cbd5e1 #f1f5f9", // Firefox
                }}
                css={`
                  &::-webkit-scrollbar {
                    width: 6px;
                  }
                  &::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 10px;
                  }
                  &::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                  }
                  &::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                  }
                `}
              >
                {/* ประเภท */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชนิดถังดับเพลิง <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={extinguisherOptions}
                    value={extinguisherOptions.find((opt) => opt.value === formData.type)}
                    onChange={(selected) => setFormData({ ...formData, type: selected?.value || "" })}
                    placeholder="-- เลือกประเภท --"
                    isClearable
                    className="w-full text-sm"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? "#3b82f6" : "#d1d5db", // focus = blue-500
                        boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none", // เส้นขอบหนา
                        "&:hover": { borderColor: state.isFocused ? "#3b82f6" : "#1e40af" },
                        borderRadius: "0.5rem",
                        padding: "2px",
                        transition: "all 0.15s ease",
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? "#1e40af" : state.isFocused ? "#eff6ff" : "white",
                        color: state.isSelected ? "white" : "#111827",
                        cursor: "pointer",
                      }),
                    }}
                  />
                </div>

                {/* จุดติดตั้ง */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    จุดติดตั้ง <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="เช่น ห้องประชุม ชั้น 2"
                    required
                  />
                </div>

                {/* ขนาด */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    ขนาดถัง (lbs) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-3">
                    {["5", "10", "15"].map((size) => (
                      <label
                        key={size}
                        className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.size === size
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          checked={formData.size === size}
                          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                          className="sr-only"
                          required
                        />
                        <span className="font-medium">{size} lbs</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* แนบภาพ */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">แนบภาพถังดับเพลิง</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      className="hidden"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-8 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
                    >
                      {!formData.image ? (
                        <div className="text-center">
                          <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <span className="text-sm text-gray-600">คลิกเพื่อเลือกรูปภาพ</span>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF (แนะนำ 800x600px)</p>
                        </div>
                      ) : (
                        <div className="relative w-full">
                          <img
                            src={URL.createObjectURL(formData.image)}
                            alt="preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg">
                            <PhotoIcon className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* ผู้รับผิดชอบ */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ผู้รับผิดชอบ <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={userOptions}
                    value={userOptions.find((opt) => opt.value === formData.responsible)}
                    onChange={(selected) => setFormData({ ...formData, responsible: selected?.value || "" })}
                    placeholder="-- เลือกผู้รับผิดชอบ --"
                    isClearable
                    className="w-full text-sm"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? "#3b82f6" : "#d1d5db", // blue-500 ตอน focus
                        boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none", // เส้นขอบหนาเหมือน input
                        "&:hover": {
                          borderColor: state.isFocused ? "#3b82f6" : "#1e40af", // hover สีน้ำเงินเข้ม
                        },
                        borderRadius: "0.5rem",
                        padding: "2px",
                        transition: "all 0.15s ease", // เพิ่มความนุ่มเวลา focus
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? "#1e40af" : state.isFocused ? "#eff6ff" : "white",
                        color: state.isSelected ? "white" : "#111827",
                        cursor: "pointer",
                      }),
                    }}
                  />
                </div>

                {/* คุณสมบัติ */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">คุณสมบัติ</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                    rows="3"
                    value={formData.properties}
                    onChange={(e) => setFormData({ ...formData, properties: e.target.value })}
                    placeholder="เช่น ใช้สำหรับไฟประเภท A, B, C..."
                  ></textarea>
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="flex justify-end space-x-3 px-6 py-2 bg-white border-t border-gray-200 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
                <button
                  type="submit"
                  className="px-5 py-2.5 text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors font-medium"
                >
                  บันทึก
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
