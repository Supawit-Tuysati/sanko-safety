import { useState } from "react";
import { PlusIcon, FireIcon, XMarkIcon, PhotoIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import { useAuth } from "../context/AuthContext.jsx";

export default function ExtinguisherListPage() {
  // const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pins, setPins] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);

  const [extinguishers, setExtinguishers] = useState([
    { id: 1, type: "Co2", location: "อาคารสำนักงาน ชั้น 1", status: "ปกติ" },
    { id: 2, type: "Dry Chemical", location: "คลังสินค้า A", status: "รอตรวจ" },
    { id: 3, type: "Foam", location: "โรงงานผลิต", status: "หมดอายุ" },
  ]);

  const handleImageClick = (e) => {
    // ใช้ตำแหน่งจริงของภาพ ไม่ใช่ container
    const img = e.target;
    const rect = img.getBoundingClientRect();

    // คำนวณตำแหน่งที่คลิกบนภาพ
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPins([{ x, y }]); // มีแค่หมุดเดียวต่อชั้น
  };

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

  const images = [
    { name: "floor1", url: "/images/map-sanko-floor1.png" },
    { name: "floor2", url: "/images/map-sanko-floor2.png" },
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
    setPins([]);
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const openModal = async () => {
    setFormData({
      type: "",
      size: "",
      image: null,
      location: "",
      responsible: "",
      properties: "",
    });
    setPins([]);
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Header + Add Button */}
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

      {/* ตารางรายการ */}
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

      {/* Modal - Form เพิ่มถังดับเพลิง */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
            {/* Header */}
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

            {/* Form */}
            <form onSubmit={handleAdd} className="flex flex-col flex-1">
              {/* Scrollable Body */}
              <div
                className="flex-1 overflow-y-auto pl-5 pr-4 py-6 space-y-5"
                style={{
                  maxHeight: "calc(90vh - 180px)",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#cbd5e1 #f1f5f9",
                }}
              >
                {/* ประเภท */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชนิดถังดับเพลิง <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={extinguisherOptions}
                    value={extinguisherOptions.find((opt) => opt.value === formData.type)}
                    onChange={(selected) => setFormData({ ...formData, type: selected?.label || "" })}
                    placeholder="-- เลือกประเภท --"
                    isClearable
                    className="w-full text-sm"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                        boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none",
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

                  <div className="grid grid-cols-2 gap-4">
                    {images.map((img, index) => {
                      const floor = `ชั้น ${index + 1}`;
                      return (
                        <button
                          type="button"
                          key={img.name}
                          className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center transition-all
                            ${
                              formData.location === floor
                                ? "ring-2 ring-blue-500 bg-blue-50"
                                : "hover:shadow-lg hover:border-blue-300"
                            }`}
                          onClick={() => {
                            setSelectedImage(img.url);
                            setShowImageModal(true);
                          }}
                        >
                          <span className="text-lg font-medium">{floor}</span>
                          <span className="text-xs text-gray-500 mt-1">คลิกเพื่อปักหมุด</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* แสดงสถานะการปักหมุด */}
                  {formData.location && pins.length > 0 && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-green-700 font-medium">ปักหมุดตำแหน่งเรียบร้อยแล้ว</span>
                    </div>
                  )}
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
                            <PhotoIcon className="h-5 w-5 text-blue-800" />
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
                        borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                        boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none",
                        "&:hover": {
                          borderColor: state.isFocused ? "#3b82f6" : "#1e40af",
                        },
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

      {/* Modal แสดงภาพเต็มจอสำหรับปักหมุด */}
      {showImageModal && selectedImage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center">
          <div className="w-full h-full flex flex-col">
            {/* Header แบบโปร่งแสง */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 via-black/50 to-transparent">
              <div className="flex justify-between items-center px-8 py-6 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-light tracking-wide">คลิกบนแผนผังเพื่อปักหมุดตำแหน่งติดตั้ง</h2>
                </div>
                <button
                  onClick={() => setShowImageModal(false)}
                  className="hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:rotate-90"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Image Area - เต็มจอพร้อม Zoom */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-20" id="image-container">
              <div className="relative inline-block">
                <img
                  src={selectedImage}
                  alt="Floor plan"
                  className="cursor-crosshair shadow-[0_20px_80px_rgba(0,0,0,0.8)] rounded-lg"
                  onClick={(e) => {
                    handleImageClick(e);
                    const floor = `ชั้น ${images.findIndex((img) => img.url === selectedImage) + 1}`;
                    setFormData({ ...formData, location: floor });
                  }}
                  style={{ display: "block", maxHeight: "calc(100vh - 200px)", width: "auto" }}
                />
                {pins.map((pin, index) => {
                  const img = document.querySelector("#image-container img");
                  if (!img) return null;

                  return (
                    <div
                      key={index}
                      className="absolute pointer-events-none"
                      style={{
                        left: `${pin.x}%`,
                        top: `${pin.y}%`,
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                      }}
                    >
                      {/* Pin หลัก */}
                      <div className="relative w-6 h-6 bg-red-600 border-2 border-white rounded-full shadow-xl animate-pulse flex items-center justify-center"></div>

                      {/* Label */}
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <div className="bg-red-600 text-white rounded px-2 py-0.5 shadow-lg">
                          <span className="text-sm font-medium">🔥 ตำแหน่งติดตั้ง</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer แบบลอย */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
              <div className="flex justify-center items-center px-8 py-8">
                <button
                  onClick={() => setShowImageModal(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors font-medium"
                >
                  <MapPinIcon className="w-5 h-5" />
                  ยืนยันตำแหน่ง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
