import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-100 mt-[30px] mx-[40px] rounded pb-[20px] text-blue-500">
            <div className="container mx-auto">
                <div className=" ">
                <h2 className="text-lg font-bold mb-2 text-center pt-[20px]">Contact Information</h2>
                    <div className="flex justify-between items-center">
                       
                       <div><p className="text-pink-500 ml-[10px]">Email:
                            coolstuffcorp758@gmail.com
                        </p></div> 
                        <div> <p className="text-pink-500">Phone: +123 456 7890</p></div>
                       <div> <p className="text-pink-500 mr-[10px]">Address: 123 Street, Nairobi</p></div>
                       
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
