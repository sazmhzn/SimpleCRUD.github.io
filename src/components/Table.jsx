import { Link } from "react-router-dom";
import HeaderBox from "./HeaderBox";
import { useMemo, useState } from "react";
import Pagination from "./Pagination";
import CustomInput from "./CustomInput";
import { CustomSelect } from "./CustomSelect";

const Table = ({ storedData, handleDelete }) => {
  const rowsLimit = 5;
  const totalPage = Math.ceil(storedData.length / rowsLimit);
  const [currentPage, setCurrentPage] = useState(0);

  const rowsToShow = useMemo(() => {
    const startIndex = currentPage * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    return storedData.slice(startIndex, endIndex);
  }, [currentPage, storedData]);

  const nextPage = () => {
    if (currentPage < totalPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="overflow-x-auto">
      <HeaderBox title="User details" subtext="All the user Details" />
      <div>
        <CustomInput />
        <CustomSelect />
      </div>

      <div className="flex-auto block py-8 pt-6 px-9">
        <div className="overflow-x-auto">
          <table className="w-full my-0 align-middle text-dark border-neutral-200">
            <thead className="align-bottom">
              <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                <th className="pb-3 text-start min-w-[25px]">ID</th>
                <th className="pb-3 text-end min-w-[100px]">Name</th>
                <th className="pb-3 text-end min-w-[100px]">Email</th>
                <th className="pb-3 pr-12 text-end min-w-[175px]">Phone</th>
                <th className="pb-3 pr-12 text-end min-w-[100px]">City</th>
                <th className="pb-3 text-end min-w-[70px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {rowsToShow.map((data) => {
                return (
                  <tr
                    key={data.id}
                    className="border-b border-dashed last:border-b-0"
                  >
                    <td className="p-3 pl-0">
                      <div className="flex items-center">
                        <div className="relative inline-block shrink-0 rounded-2xl me-3">
                          <img
                            src={data.profilePicture}
                            className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                            alt="profile"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3 pr-0 text-end">
                      <span className="font-semibold text-light-inverse text-md/normal">
                        {data.name}
                      </span>
                    </td>
                    <td className="p-3 pr-0 text-end">
                      <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                        {data.email}
                      </span>
                    </td>
                    <td className="p-3 pr-12 text-end">
                      <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                        {data.phoneNumber}
                      </span>
                    </td>
                    <td className="pr-0 text-start">
                      <span className="font-semibold text-light-inverse text-md/normal">
                        {data.city.length > 0 ? data.city : "-"}
                      </span>
                    </td>
                    <td className="p-3 pr-0 text-end">
                      <Link
                        onClick={() => handleDelete(data.id)}
                        className="ml-auto gap-4 relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center"
                      >
                        <span className="text-red-600 flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                          delete
                        </span>
                      </Link>
                      <Link
                        to={`/Home/EditUser/${data.id}`}
                        className="ml-auto gap-4 relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center"
                      >
                        <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                          edit
                        </span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
        <div className="text-sm text-neutral-400">
          Showing {currentPage * rowsLimit + 1} to{" "}
          {Math.min((currentPage + 1) * rowsLimit, storedData.length)} of{" "}
          {storedData.length} entries
        </div>
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          changePage={changePage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </div>
    </div>
  );
};

export default Table;
