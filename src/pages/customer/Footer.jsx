import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-100 mt-[30px] mx-[40px] rounded mb-[0px]">
            <div className="container mx-auto">
                <div className=" ">
                <h2 className="text-lg font-bold mb-2 text-center">Contact Information</h2>
                    <div className="flex justify-between items-center">
                       
                       <div><p className="text-gray-600 ml-[10px]">Email:
                            coolstuffcorp758@gmail.com
                        </p></div> 
                        <div> <p className="text-gray-600">Phone: +123 456 7890</p></div>
                       <div> <p className="text-gray-600 mr-[10px]">Address: 123 Street, Nairobi</p></div>
                       
                    </div>
                    <div>
                        {/* Add any additional content or social media links here */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
