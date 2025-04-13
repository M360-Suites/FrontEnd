import { emailTemplates } from "../../../utils/dummyData";
import { Icon } from "@iconify/react/dist/iconify.js";
const EmailTemplates = () => {
  return (
    <div className='p-4'>
      <div className="p-4">
        <div className='flex items-center gap-3'>
          <Icon icon={"eva:arrow-back-fill"} className='text-xl' />{" "}
          <span className="font-semibold text-xl">Templates</span>
        </div>
        <p className="text-gray-500">Browse email templates to create your email campaign</p>
      </div>

      {/* templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {emailTemplates.map((template, index) => (
          <div
            key={index}
            className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg p-4 border border-gray-100"
          >
            <div className="flex flex-col">
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-auto mb-4 object-cover"
              />
              <div className="">
                <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                <p className="text-gray-500 text-sm">{template.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default EmailTemplates;
