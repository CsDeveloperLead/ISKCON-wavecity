"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PiBellSimpleZLight } from "react-icons/pi";
import { IoIosCloseCircleOutline } from "react-icons/io";


const MainNavbar = () => {
  // for status and slot time
  const [status, setStatus] = useState({ isOpen: false, timeSlot: "Closed" });
  const [isDayTime, setIsDayTime] = useState(false); // New state for day/night

  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();

      // Define the open and closed time ranges
      const openingHour = 4;
      const openingMinute = 30;
      const closingHourMorning = 13;
      const closingMinuteMorning = 0;
      const afternoonCloseStart = 13;
      const afternoonCloseEnd = 16;
      const reopeningHour = 16;
      const reopeningMinute = 0;
      const closingHourEvening = 21;
      const closingMinuteEvening = 30;
      const nightCloseStart = 21;
      const nightCloseMinuteStart = 30;
      const nightCloseEnd = 4;
      const nightCloseMinuteEnd = 30;

      // Determine if it's open or closed
      if (
        (currentHour > openingHour ||
          (currentHour === openingHour && currentMinute >= openingMinute)) &&
        (currentHour < closingHourMorning ||
          (currentHour === closingHourMorning &&
            currentMinute <= closingMinuteMorning))
      ) {
        // Open from 04:30 - 13:00
        setStatus({
          isOpen: true,
          timeSlot: "04:30 - 13:00",
         
        });
        setIsDayTime(true);
      } else if (
        currentHour >= afternoonCloseStart &&
        currentHour < afternoonCloseEnd
      ) {
        // Closed from 13:00 - 16:00
        setStatus({
          isOpen: false,
          timeSlot: "13:00 - 16:00",
         
        });
        setIsDayTime(true);
      } else if (
        (currentHour > reopeningHour ||
          (currentHour === reopeningHour &&
            currentMinute >= reopeningMinute)) &&
        (currentHour < closingHourEvening ||
          (currentHour === closingHourEvening &&
            currentMinute <= closingMinuteEvening))
      ) {
        // Open from 16:00 - 21:30
        setStatus({
          isOpen: true,
          timeSlot: "16:00 - 21:30",
          
        });
        setIsDayTime(false);
      } else if (
        currentHour > nightCloseStart ||
        (currentHour === nightCloseStart &&
          currentMinute >= nightCloseMinuteStart) ||
        currentHour < nightCloseEnd ||
        (currentHour === nightCloseEnd && currentMinute <= nightCloseMinuteEnd)
      ) {
        // Closed from 21:30 - 04:30
        setStatus({
          isOpen: false,
          timeSlot: "21:30 - 04:30",
        
        });
        setIsDayTime(false);
      } else {
        // Default to closed if none of the conditions are met
        setStatus({
          isOpen: false,
          timeSlot: "Closed",
        });
      }

      // Check if it's daytime (between 04:30 and 21:30)
      // setIsDayTime(
      //   (currentHour > openingHour ||
      //     (currentHour === openingHour && currentMinute >= openingMinute)) &&
      //     (currentHour < closingHourEvening ||
      //       (currentHour === closingHourEvening &&
      //         currentMinute <= closingMinuteEvening))
      // );
    };

    // Check time initially
    checkTime();

    // Optionally, check every minute
    const interval = setInterval(checkTime, 60000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  //   for schedule modal

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

//   for active links of navbar
// const [,activeLink setActiveLink] = useState('/'); // Set default active link

const handleLinkClick = (link) => {
  setActiveLink(link); // Update active link on click
};

  return (
    <div className="">
      <div className="flex flex-col gap-6 py-6">
        {/* uppersection */}
        <div className="flex items-center justify-between">
        <Link href={"/"}>
          <div className="flex items-center gap-4">
          
            <svg
              width="80"
              height="68"
              viewBox="0 0 80 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M71.0316 21.8662C68.9414 25.1878 68.9576 28.8172 66.7864 34.0022C65.1985 33.8401 63.6107 33.7753 62.0228 33.8401C62.2658 32.5925 62.3792 31.3287 62.363 30.0649C62.3144 27.5696 62.0552 25.0744 61.5853 22.6277C64.6963 22.0282 67.8558 21.769 71.0316 21.8662ZM60.8724 30.5347C60.8724 31.6689 60.7751 32.8031 60.5645 33.9211C56.3031 34.2614 52.2038 35.7197 48.6716 38.1339C51.7015 34.8447 53.3866 30.5347 53.4028 26.0627C53.4028 25.9169 53.4028 25.7873 53.3866 25.6415C55.4444 24.4424 57.648 23.5513 59.9488 22.9842C60.4673 25.4794 60.7751 28.0071 60.8724 30.5347ZM46.7596 40.1917C50.6807 37.1617 55.3958 35.3794 60.3377 35.0229C58.928 40.2889 55.0555 42.3953 51.9932 42.3953C50.0164 42.3953 48.1369 41.6013 46.7596 40.1917ZM52.3334 27.4238C52.3334 32.9652 49.2225 37.0321 46.4842 39.657C46.0953 38.7496 45.6009 37.7936 45.9171 36.8053C45.9171 33.4675 47.8614 29.4005 52.301 26.3544C52.3334 26.7108 52.3334 27.0673 52.3334 27.4238ZM45.3176 36.6432C45.3176 37.4534 45.4472 38.2635 45.7226 39.0251C44.9449 37.5344 44.5398 35.8655 44.5398 34.1804C44.5398 28.6876 47.0189 23.5513 50.3405 19.3871C51.264 21.2181 51.8797 23.1786 52.1876 25.1878C47.9262 28.0557 45.3176 32.0578 45.3176 36.6432ZM47.7966 41.5851C49.0442 42.4439 50.5349 42.9138 52.0418 42.9462C56.8216 42.9462 60.4025 39.9972 61.7635 34.9419C63.2704 34.8933 64.7935 34.9581 66.3003 35.1202C66.3003 35.1364 66.2841 35.1364 66.2841 35.1364C63.6593 40.8236 58.7498 43.8373 53.9213 43.8373C51.6691 43.9345 49.4655 43.1244 47.7966 41.5851ZM60.0298 11.1398C58.8794 14.6397 59.2197 18.2691 59.7706 21.7852C57.5184 22.4009 55.3634 23.292 53.338 24.4586C53.1112 22.2226 52.4955 20.0352 51.5233 17.9937C53.9537 15.2554 56.8378 12.9222 60.0298 11.1398ZM44.4426 6.70024C45.5282 11.4477 47.9586 14.8179 49.8382 18.3825C47.1647 21.6879 45.3014 25.5766 44.4426 29.7408H44.5398V6.70024H44.4426ZM48.1369 42.3953C49.903 43.7563 52.058 44.4854 54.2778 44.4854C59.5599 44.4854 64.7611 41.4555 67.8396 35.3146C70.4159 35.7197 72.9597 36.384 75.3902 37.3076C69.8974 38.7658 63.9185 45.409 56.4004 45.409C52.9491 45.409 50.1622 44.2586 48.3313 42.5249L48.1369 42.3953ZM43.7945 35.0067C44.7667 40.8398 49.3197 46.2678 57.1781 46.2678C66.2517 46.2678 73.9805 37.826 79.1979 37.5992C79.5867 37.583 79.5867 37.4048 79.2789 37.2914C75.7791 35.8331 72.1334 34.7961 68.3905 34.2128C70.6589 29.0765 70.7075 24.6045 72.8949 21.1046C73.0894 20.7968 73.057 20.6996 72.7005 20.6672C68.9252 20.3431 65.1175 20.5861 61.4071 21.3963C60.7751 17.4266 60.3053 13.5379 61.8283 9.08207C61.9418 8.74181 61.8769 8.57978 61.5205 8.74181C57.5346 10.7996 53.9861 13.6027 51.0372 16.9729C48.5581 12.0148 44.9449 7.44558 43.9565 0.364902C43.8917 -0.072577 43.6649 -0.0401712 43.6649 0.364902V32.6573C43.6649 35.4928 41.6881 36.8053 39.8086 36.8053C37.929 36.8053 35.9523 35.4766 35.9523 32.6573V0.381104C35.9523 -0.0239685 35.7254 -0.0563744 35.6606 0.381104C34.6722 7.44558 31.059 12.031 28.5962 16.9729C25.6472 13.5865 22.0826 10.7996 18.1129 8.74181C17.7726 8.57978 17.6916 8.72561 17.805 9.08207C19.3443 13.5541 18.8744 17.4266 18.2263 21.3963C14.5158 20.5861 10.7081 20.3431 6.93285 20.6672C6.59259 20.6996 6.56018 20.7968 6.73841 21.1046C8.92581 24.6045 8.99062 29.0765 11.2428 34.2128C7.49995 34.7961 3.83809 35.8331 0.354462 37.2914C0.046607 37.421 0.046607 37.5992 0.435477 37.5992C5.63661 37.8098 13.3816 46.2678 22.4552 46.2678C30.3299 46.2678 34.8667 40.8398 35.8389 35.0067L35.6768 35.0391C36.3087 36.465 37.6698 37.421 39.2253 37.5344L39.2415 37.4372C37.1027 37.664 35.3852 39.2843 35.3852 41.3583C35.3852 44.6637 38.6258 45.7331 39.5817 48.2283C39.6465 48.3904 39.6789 48.5686 39.8248 48.5686C39.9706 48.5686 39.9868 48.4066 40.0678 48.2283C41.04 45.7331 44.2644 44.6637 44.2644 41.3583C44.1672 39.2519 42.4983 37.5506 40.4081 37.4372L40.4243 37.5344C41.9798 37.421 43.3408 36.465 43.9727 35.0391L43.7945 35.0067ZM18.0481 22.6439C17.5782 25.0906 17.3189 27.5858 17.2703 30.0811C17.2703 31.3449 17.3837 32.6087 17.6106 33.8563C16.0227 33.7915 14.4348 33.8401 12.8469 34.0184C10.6757 28.8334 10.6919 25.204 8.60175 21.8824C11.7613 21.769 14.9209 22.0282 18.0481 22.6439ZM19.6683 23.0004C21.9692 23.5675 24.1728 24.4748 26.2305 25.6577C26.2305 25.8035 26.2143 25.9331 26.2143 26.0789C26.2143 30.5509 27.9156 34.8609 30.9456 38.1501C27.4133 35.7359 23.314 34.2776 19.0526 33.9373C18.842 32.8193 18.7448 31.6851 18.7448 30.5509C18.8582 28.0071 19.1661 25.4956 19.6683 23.0004ZM27.6402 42.4115C24.5778 42.4115 20.7053 40.2889 19.2957 35.0391C24.2376 35.3794 28.9526 37.1779 32.8737 40.2079C31.4965 41.6013 29.6169 42.3953 27.6402 42.4115ZM27.3323 26.3706C31.7719 29.4167 33.7163 33.4837 33.7163 36.8215C33.7325 37.7936 33.538 38.7658 33.1492 39.6732C30.4109 37.0483 27.2999 32.9814 27.2999 27.44C27.2999 27.0673 27.2999 26.7108 27.3323 26.3706ZM27.4457 25.204C27.7374 23.1786 28.3693 21.2181 29.2929 19.4033C32.6145 23.5513 35.0935 28.7038 35.0935 34.1966C35.0935 35.8817 34.6884 37.5344 33.9107 39.0413C34.1862 38.2797 34.3158 37.4696 34.3158 36.6594C34.3158 32.0578 31.7071 28.0557 27.4457 25.204ZM25.712 43.8373C20.8836 43.8373 15.9741 40.8236 13.3492 35.1364C13.3492 35.1202 13.333 35.1202 13.333 35.1202C14.8399 34.9581 16.3467 34.8933 17.8698 34.9419C19.2309 39.9972 22.8117 42.9462 27.5916 42.9462C29.1146 42.93 30.5891 42.4601 31.8367 41.5851C30.184 43.1244 27.9642 43.9345 25.712 43.8373ZM28.1101 17.9937C27.1379 20.0352 26.5222 22.2226 26.2953 24.4586C24.27 23.292 22.115 22.4009 19.8628 21.7852C20.4137 18.2529 20.7539 14.6397 19.6035 11.1398C22.8117 12.9384 25.6796 15.2554 28.1101 17.9937ZM35.0773 6.70024V29.7408H35.1745C34.3158 25.5766 32.4686 21.6879 29.779 18.3825C31.6585 14.8017 34.0889 11.4477 35.1745 6.70024H35.0773ZM31.302 42.5087C29.4711 44.2424 26.6842 45.3928 23.233 45.3928C15.7148 45.3928 9.73595 38.7496 4.24316 37.3076C6.6898 36.384 9.21746 35.7197 11.7937 35.3146C14.8723 41.4555 20.0734 44.4854 25.3556 44.4854C27.5754 44.4854 29.7466 43.7401 31.4965 42.3953L31.302 42.5087Z"
                fill="#4552e3"
              />
              <path
                d="M22.461 57.2224C22.3152 57.2386 22.2504 57.2224 22.218 57.1252C22.0559 56.2502 21.2944 55.6183 20.4194 55.6183C19.6579 55.5211 18.9774 56.072 18.8802 56.8173C18.8802 56.8497 18.8802 56.8983 18.864 56.9307C18.864 57.9029 19.6741 58.3242 20.7435 58.6645C22.2828 59.1668 23.2874 59.7987 23.2874 61.2893C23.2874 62.78 22.1207 63.8332 20.1116 63.8332C19.35 63.8656 18.5723 63.7036 17.8756 63.3957C17.7136 63.3309 17.6001 63.2013 17.5515 63.0555C17.3733 62.5208 17.2761 61.9537 17.2923 61.3866C17.2923 61.2893 17.3895 61.2569 17.5029 61.2407C17.6163 61.2245 17.6973 61.2569 17.7136 61.3379C18.0376 62.1967 18.7181 63.3471 20.0792 63.3471C21.1486 63.3471 21.8291 62.7152 21.8291 61.8564C21.8291 61.1273 21.5698 60.5278 20.144 60.0579C18.7181 59.588 17.5353 58.8427 17.5353 57.4006C17.5353 56.153 18.5561 55.0836 20.5653 55.0836C21.1162 55.0998 21.6671 55.1646 22.218 55.2943C22.4124 55.3429 22.4286 55.3753 22.4772 55.5049C22.623 56.0072 22.6878 56.5257 22.6878 57.0442C22.6716 57.1576 22.6068 57.2062 22.461 57.2224Z"
                fill="#4552e3"
              />
              <path
                d="M45.4527 61.4189C45.5661 61.4351 45.6309 61.4837 45.6147 61.5486C45.5499 62.1481 45.3716 62.7476 45.1124 63.2823C45.0638 63.3795 44.9828 63.4443 44.8693 63.4767C44.124 63.7359 43.3463 63.8656 42.5523 63.8818C39.7492 63.8818 37.5942 62.4721 37.5942 59.4908C37.5942 56.5905 39.8788 55.0674 42.5199 55.0674C43.3787 55.0836 44.2212 55.2132 45.0476 55.4076C45.2096 55.4401 45.2258 55.4725 45.242 55.6183C45.2582 55.9747 45.2906 56.6067 45.404 57.3682C45.4203 57.4492 45.3716 57.4816 45.242 57.514C45.0962 57.5302 45.0314 57.514 45.0152 57.433C44.7883 56.2826 43.7351 55.4887 42.5685 55.5859C40.9644 55.5859 39.3442 56.7201 39.3442 59.3125C39.3442 62.0022 41.0293 63.3309 42.6658 63.3309C43.8486 63.3471 44.9018 62.5855 45.2744 61.4675C45.2744 61.4189 45.3392 61.4027 45.4527 61.4189Z"
                fill="#4552e3"
              />
              <path
                d="M48.7095 59.507C48.7581 57.028 50.7834 55.0512 53.2625 55.0998C55.6767 55.1322 57.6373 57.0928 57.6697 59.507C57.6049 61.9861 55.5309 63.9304 53.0519 63.8656C50.6862 63.8008 48.7743 61.8888 48.7095 59.507ZM53.1977 63.3309C54.7208 63.3309 55.936 61.6944 55.936 59.507C55.936 57.4816 54.9476 55.6507 53.1977 55.6507C51.4478 55.6507 50.4594 57.4978 50.4594 59.507C50.4432 61.6944 51.6584 63.3309 53.1977 63.3309Z"
                fill="#4552e3"
              />
              <path
                d="M10.8919 59.4908V61.8402C10.8919 63.1851 10.7785 63.2175 10.179 63.2985L9.90351 63.3309C9.8225 63.3471 9.8063 63.4281 9.8063 63.5253C9.8225 63.6226 9.8387 63.7036 9.91972 63.6874C9.91972 63.6874 11.0215 63.655 11.621 63.655C12.2205 63.655 13.3223 63.6874 13.3223 63.6874C13.4033 63.6874 13.4358 63.6226 13.4358 63.5253C13.452 63.4281 13.4195 63.3309 13.3385 63.3309L13.0631 63.2985C12.4636 63.2175 12.3502 63.1851 12.3502 61.8402V57.1414C12.3502 55.7965 12.4636 55.7641 13.0631 55.6831L13.3385 55.6507C13.4195 55.6345 13.4358 55.5535 13.4358 55.4563C13.4358 55.3591 13.4033 55.2943 13.3223 55.2943C13.3223 55.2943 12.2205 55.3267 11.621 55.3267C11.0215 55.3267 9.91972 55.2943 9.91972 55.2943C9.8387 55.2943 9.8063 55.3591 9.8063 55.4563C9.76009 55.5535 9.8225 55.6507 9.90351 55.6507L10.179 55.6831C10.7785 55.7641 10.8919 55.7965 10.8919 57.1414V59.4908Z"
                fill="#4552e3"
              />
              <path
                d="M32.5391 62.9744C32.6849 63.1689 32.5715 63.2661 32.4095 63.2985L32.0854 63.3471C32.0044 63.3633 31.9882 63.4281 32.0044 63.5415C32.0206 63.6549 32.053 63.7198 32.1178 63.7036C32.1178 63.7036 33.1872 63.6712 33.7705 63.6712C34.37 63.6712 35.4394 63.7036 35.4394 63.7036C35.5204 63.7036 35.5529 63.655 35.5691 63.5253C35.5853 63.3957 35.5367 63.3309 35.4718 63.3309C34.9533 63.3471 34.4673 63.1203 34.1594 62.7152C33.3493 61.8078 31.7452 59.75 31.0971 58.8913C31.016 58.8103 31.016 58.6645 31.0971 58.5834L31.1133 58.5672C31.4697 58.1784 32.6363 56.9956 33.1548 56.5257C33.6733 56.0072 34.3538 55.6993 35.083 55.6345C35.1478 55.6183 35.1964 55.5373 35.1802 55.4239C35.164 55.3267 35.1316 55.2618 35.0506 55.278C35.0506 55.278 34.1432 55.3104 33.6571 55.3104C33.171 55.3104 32.2637 55.278 32.2637 55.278C32.1826 55.278 32.1502 55.3591 32.1502 55.4401C32.134 55.5535 32.1664 55.6183 32.2313 55.6345L32.5715 55.7317C32.6363 55.7479 32.6849 55.7803 32.6849 55.8451C32.7011 55.991 32.4257 56.2988 32.0692 56.7039C31.5669 57.271 30.692 58.1946 30.2221 58.6482C29.8332 59.0209 29.6712 59.0857 29.5254 59.0047C29.4119 58.9561 29.3633 58.8265 29.3633 58.4376V57.109C29.3633 55.7641 29.4768 55.7317 30.0763 55.6507L30.3517 55.6183C30.4327 55.6021 30.4489 55.5211 30.4489 55.4239C30.4327 55.3267 30.4165 55.2618 30.3355 55.2618C30.3355 55.2618 29.2337 55.2942 28.6342 55.2942C28.0347 55.2942 26.9329 55.2618 26.9329 55.2618C26.8519 55.2618 26.8195 55.3267 26.8195 55.4239C26.8033 55.5211 26.8357 55.6183 26.9167 55.6183L27.1921 55.6507C27.7917 55.7317 27.9051 55.7641 27.9051 57.109V61.8078C27.9051 63.1527 27.7917 63.1851 27.1921 63.2661L26.9167 63.2985C26.8357 63.3147 26.8195 63.3957 26.8195 63.4929C26.8195 63.5901 26.8519 63.6712 26.9329 63.655C26.9329 63.655 28.0347 63.6225 28.6342 63.6225C29.2337 63.6225 30.3355 63.655 30.3355 63.655C30.4165 63.655 30.4489 63.5901 30.4489 63.4929C30.4651 63.3957 30.4327 63.2985 30.3517 63.2985L30.0763 63.2661C29.4768 63.1851 29.3633 63.1527 29.3633 61.8078V59.9283C29.3633 59.7176 29.4444 59.588 29.574 59.5556C29.7198 59.5232 29.8332 59.588 29.979 59.75C30.6758 60.5116 31.9882 62.2291 32.5391 62.9744Z"
                fill="#4552e3"
              />
              <path
                d="M62.3364 57.0603C63.9405 58.713 66.4196 61.581 68.2991 63.8332C68.3801 63.9304 68.4611 63.9466 68.6232 63.8818C68.769 63.817 68.7852 63.7683 68.7852 63.6549C68.7528 63.023 68.7366 62.4235 68.7366 61.8564V57.5626C68.7366 56.072 68.85 55.7803 69.4495 55.6993L69.725 55.6669C69.806 55.6507 69.8222 55.5697 69.8222 55.4725C69.8222 55.3752 69.7898 55.2942 69.7088 55.3104C69.2227 55.3428 68.7528 55.3428 68.4287 55.3428C68.0885 55.3428 67.489 55.3266 67.0029 55.3104C66.9219 55.3104 66.8895 55.3752 66.8895 55.4725C66.8733 55.5697 66.9219 55.6669 66.9867 55.6669C67.9913 55.7155 68.1209 55.9261 68.1209 57.5626V61.5161L68.2181 61.4189C66.371 59.5394 64.6535 57.5626 63.0494 55.4725C62.9684 55.359 62.9522 55.3104 62.8063 55.3266C62.0772 55.359 61.3481 55.359 60.6189 55.3104C60.5379 55.2942 60.5055 55.3752 60.5055 55.4725C60.4893 55.5697 60.5217 55.6507 60.6027 55.6669C61.5749 55.8613 61.8504 56.153 61.8504 57.1576V61.4513C61.8504 62.942 61.7369 63.2337 61.1374 63.3147L60.862 63.3471C60.781 63.3633 60.7648 63.4443 60.7648 63.5415C60.7648 63.6387 60.7972 63.7197 60.8782 63.7035C61.3643 63.6711 61.8342 63.6711 62.1582 63.6711C62.4985 63.6711 62.9522 63.6873 63.4382 63.7035C63.5193 63.7035 63.5517 63.6387 63.5517 63.5415C63.5679 63.4443 63.5355 63.3471 63.4544 63.3471L63.179 63.3147C62.5795 63.2337 62.4661 62.942 62.4661 61.4513V56.9955L62.3364 57.0603Z"
                fill="#4552e3"
              />
              <path
                d="M69.7397 52.7741C69.8855 52.7741 69.9989 52.612 69.9989 52.3528C69.9989 52.0935 69.8855 51.9315 69.7397 51.9315H9.90231C9.75649 51.9315 9.64307 52.0935 9.64307 52.3528C9.64307 52.612 9.75649 52.7741 9.90231 52.7741H69.7397Z"
                fill="#4552e3"
              />
              <path
                d="M69.7397 67.0488C69.8855 67.0488 69.9989 66.8868 69.9989 66.6275C69.9989 66.3683 69.8855 66.2062 69.7397 66.2062H9.90231C9.75649 66.2062 9.64307 66.3683 9.64307 66.6275C9.64307 66.8868 9.75649 67.0488 9.90231 67.0488H69.7397Z"
                fill="#4552e3"
              />
              <path
                d="M75.1798 49.5581C75.196 50.5303 74.4344 51.3242 73.4623 51.3404C72.4901 51.3566 71.6961 50.5951 71.6799 49.6229C71.6637 48.6507 72.4253 47.8568 73.3975 47.8406C73.4137 47.8406 73.4299 47.8406 73.4299 47.8406C74.3858 47.8406 75.1798 48.6021 75.1798 49.5581ZM72.1012 49.5581C72.1498 50.2872 72.7655 50.8543 73.5109 50.8219C74.24 50.7733 74.8071 50.1576 74.7747 49.4123C74.7423 48.6993 74.159 48.1484 73.4461 48.1484C72.6845 48.1808 72.085 48.7965 72.1012 49.5581ZM72.8628 49.1692C72.8628 48.991 72.8303 48.91 72.7169 48.8938H72.6683C72.6359 48.8452 72.6359 48.7641 72.6845 48.7479C72.96 48.7317 73.203 48.7155 73.4299 48.7155C73.7377 48.7155 74.1104 48.7803 74.1104 49.1692C74.1104 49.3312 74.0132 49.4771 73.8673 49.5419C73.8349 49.5581 73.8349 49.5743 73.8673 49.6391C73.9484 49.8335 74.0618 50.028 74.2076 50.1738C74.2562 50.2062 74.2886 50.2386 74.321 50.2548C74.3534 50.2548 74.3534 50.3358 74.321 50.352C74.2562 50.352 74.1914 50.3682 74.1266 50.3682C73.9159 50.3844 73.7215 50.271 73.6243 50.0928L73.4299 49.7525C73.4137 49.7039 73.365 49.6715 73.3164 49.6715C73.2516 49.6715 73.2354 49.7039 73.2354 49.7363V49.9308C73.2354 50.1252 73.2354 50.19 73.4299 50.2062L73.4623 50.2224C73.4947 50.2386 73.4947 50.3358 73.4623 50.352C73.3326 50.352 73.2192 50.3358 73.0572 50.3358C72.9114 50.3358 72.7817 50.352 72.6683 50.352C72.6359 50.3358 72.6359 50.2386 72.6521 50.2224L72.7007 50.2062C72.8466 50.1738 72.8466 50.1414 72.8466 49.9308L72.8628 49.1692ZM73.2354 49.4285C73.2354 49.5257 73.2516 49.5257 73.3975 49.5257C73.5433 49.5419 73.6567 49.4285 73.6729 49.2988C73.6729 49.2826 73.6729 49.2664 73.6729 49.2664C73.6729 49.0558 73.5757 48.9262 73.4137 48.9262C73.2516 48.9262 73.2354 48.9586 73.2354 49.0234V49.4285Z"
                fill="#4552e3"
              />
            </svg>
           
            <div className="text-xl text-main font-bold flex flex-col">
              <h1>ISKCON</h1>
              <h1>WAVECITY</h1>
            </div>
          </div>
          </Link>
          <div className="flex items-center gap-6">
            <div className="bg-[#ffffff] rounded-3xl py-3 px-4 flex items-center gap-2 shadow-[0_1px_5px_rgba(0,0,0,0.5)]">
             
              <span >
                {status.isOpen ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="9.5" cy="9.5" r="9.5" fill="#C2FFC2" />
                    <circle cx="9.50006" cy="9.5" r="7.26471" fill="#88F888" />
                    <circle
                      cx="9.49965"
                      cy="9.50002"
                      r="3.91176"
                      fill="#50D850"
                    />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="9.5" cy="9.5" r="9.5" fill="#FFC2C2" />
                    <circle cx="9.50006" cy="9.5" r="7.26471" fill="#F88888" />
                    <circle
                      cx="9.49965"
                      cy="9.50002"
                      r="3.91176"
                      fill="#D85050"
                    />
                  </svg>
                )}
              </span>
              
            
              <p className="text-gray-600 text-sm font-semibold">
                {status.isOpen ? "Open" : "Closed"}
              </p>
              <span>
                <Image
                  src={isDayTime ? "/images/sun.gif" : "/images/moon.gif"}
                  alt="status"
                  width={20}
                  height={20}
                />
              </span>
              <p className="text-gray-600 text-sm font-semibold">
                {status.timeSlot}
              </p>
            </div>
            <div
              className="flex items-center bg-[#ffffff] rounded-3xl py-1 px-1 gap-2 shadow-[0_1px_5px_rgba(0,0,0,0.5)] cursor-pointer"
              onClick={openModal}
            >
              <span className="w-9 h-9 flex justify-center rounded-full items-center bg-[#ffa700]">
                🗓️
              </span>
              <p className="pr-2 text-gray-600 text-sm font-semibold">
                Schedule
              </p>
            </div>
            {isOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
                onClick={closeModal}
              >
                <div
                  className="bg-white rounded-lg shadow-lg p-6 w-[100%] max-w-7xl relative"
                  onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
                >
                  {/* Close button */}
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={closeModal}
                  >
                    <IoIosCloseCircleOutline size={40} />
                  </button>

                  <h2 className="text-xl font-bold text-center mb-4">
                    ISKCON Wevecity Temple Timings
                  </h2>
                  <p className="text-center text-gray-600 font-semibold mb-8">
                    Closed from 13:00 - 16:00 and 21:30 - 04:10
                  </p>

                  {/* Timings List */}
                  <div className="grid grid-cols-3 gap-8">
                    {[
                      {
                        time: "04:30 AM",
                        event: "Mangal Aarti",
                        translation: "मंगल आरती",
                      },
                      {
                        time: "05:00 AM",
                        event: "Tulsi puja",
                        translation: "तुलसी पूजा",
                      },
                      {
                        time: "07:15 AM",
                        event: "Shrinagar Darshan",
                        translation: "श्रीनगर दर्शन",
                      },
                      {
                        time: "07:30 AM",
                        event: "Guru Puja",
                        translation: "गुरु पूजा",
                      },
                      {
                        time: "08:00 AM",
                        event: "Srimad Bhagavatam Class",
                        translation: "श्रीमद भागवतम क्लास",
                      },
                      {
                        time: "12:30 PM",
                        event: "Raj Bhoga Aarti",
                        translation: "राज भोग आरती",
                      },
                      {
                        time: "01:00 PM",
                        event: "Darshan Closed",
                        translation: "दर्शन बंद",
                      },
                      {
                        time: "04:15 PM",
                        event: "Dhoop Aarti",
                        translation: "धूप आरती",
                      },
                      {
                        time: "06:30 PM",
                        event: "Sandhya Aarti",
                        translation: "संध्या आरती",
                      },
                      {
                        time: "07:30 PM",
                        event: "Bhagavad Gita Discourse",
                        translation: "भगवद गीता डिस्कोर्स ",
                      },
                      {
                        time: "08:30 PM",
                        event: "Shayan Aarti",
                        translation: "शयन आरती",
                      },
                      {
                        time: "09:00 PM",
                        event: "Darshan Closed",
                        translation: "दर्शन बंद",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-10 h-10 bg-blue-300 rounded-full flex justify-center items-center">
                          <Image
                            src="/images/puja.png"
                            alt="icon"
                            width={200}
                            height={200}
                            className="w-6 h-6 object-contain"
                          />
                        </span>
                        <div>
                          <p className="font-bold">
                            {item.time} – {item.event}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.translation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div>
              <span className="bg-[#ffffff] rounded-full w-10 h-10 flex justify-center items-center shadow-[0_1px_5px_rgba(0,0,0,0.5)]">
                <PiBellSimpleZLight size={24} />
              </span>
            </div>
            <div>
              <span className="bg-[#ffffff] text-gray-600 text-sm font-semibold rounded-full py-2 px-8 cursor-pointer flex justify-center items-center shadow-[0_1px_5px_rgba(0,0,0,0.5)]">
                Login
              </span>
            </div>
          </div>
        </div>
        {/* lowernavsection */}
        <div className="flex items-center gap-8 ">
          <div className="flex items-center w-[90%] ">
            <nav className="bg-white shadow-[0_0.5px_2px_rgba(0,0,0,0.5)] rounded-full  py-4 w-full">
              <div className="flex justify-between items-center">
               
                 
                  <Link href="/" className="group "  onClick={() => handleLinkClick('/')}>
                    <span className="text-gray-600 text-lg font-bold ml-1.5 px-9 group-hover:px-9 group-hover:text-white group-hover:bg-main group-hover:py-3.5 group-hover:rounded-full hover:px-6 group-hover:translate-x-10  transition-transform duration-3000 ">
                      Home
                    </span>
                  </Link>
                 
                  <Link href="/Iskcon" className="group" onClick={() => handleLinkClick('/Iskcon')}>
                    <span className="text-gray-600 text-lg font-bold px-9  group-hover:px-9 group-hover:text-white group-hover:bg-main group-hover:py-3.5 hover:rounded-full hover:px-6 transition-transform duration-3000 ">
                      ISKCON
                    </span>
                    {/* {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                        <Link
                          href="/iskcon1"
                          className="block px-4 py-2 text-gray-600 text-lg font-bold hover:bg-blue-100"
                        >
                          Sub Item 1
                        </Link>
                        <Link
                          href="/iskcon2"
                          className="block px-4 py-2 text-gray-600 text-lg font-bold hover:bg-blue-100"
                        >
                          Sub Item 2
                        </Link>
                      </div>
                    )} */}
                  </Link>
                 
                  <Link href="/services" className="group" onClick={() => handleLinkClick('/services')}>
                    <span className="text-gray-600 text-lg font-bold px-9 group-hover:px-9 group-hover:text-white group-hover:bg-main group-hover:py-3.5 hover:rounded-full hover:px-6 transition-transform duration-3000 ">
                      {" "}
                      Services
                    </span>
                  </Link>
                  <Link href="/media" className="group" onClick={() => handleLinkClick('/media')}>
                    <span className="text-gray-600 text-lg font-bold px-9 group-hover:px-9 group-hover:text-white group-hover:bg-main group-hover:py-3.5 hover:rounded-full hover:px-6 transition-transform duration-3000 ">
                      {" "}
                      Media
                    </span>
                  </Link>

                  <Link
                    href="/festival"
                    //   onClick={toggleDropdown}
                    className="group"
                    onClick={() => handleLinkClick('/festival')}
                  >
                    <span className="text-gray-600 text-lg font-bold px-9 group-hover:px-9 group-hover:text-white group-hover:bg-main group-hover:py-3.5 hover:rounded-full hover:px-6 transition-transform duration-3000 ">
                      {" "}
                      Festivals
                    </span>
                  </Link>
                  {/* {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                        <Link
                          href="/festival1"
                          className="block px-4 py-2 text-gray-600 text-lg font-bold hover:bg-blue-100"
                        >
                          Festival 1
                        </Link>
                        <Link
                          href="/festival2"
                          className="block px-4 py-2 text-gray-600 text-lg font-bold hover:bg-blue-100"
                        >
                          Festival 2
                        </Link>
                      </div>
                    )} */}

                  <Link href="/facility" className="group " onClick={() => handleLinkClick('/facility')}>
                    <span className="text-gray-600 text-lg font-bold px-9 group-hover:px-9 group-hover:text-white group-hover:bg-main group-hover:py-3.5 hover:rounded-full hover:px-6 transition-transform duration-3000 ">
                      {" "}
                      Facility
                    </span>
                  </Link>
                  <Link href="/donation" className="group" onClick={() => handleLinkClick('/donation')}>
                    <span className="text-gray-600 text-lg font-bold px-9 group-hover:px-9 group-hover:text-white group-hover:bg-main group-hover:py-3.5 hover:rounded-full hover:px-6 transition-transform duration-3000 ">
                      Donate
                    </span>
                  </Link>
                  <Link href="/events" className="group " onClick={() => handleLinkClick('/events')}>
                    <span className="text-gray-600 text-lg mr-1.5 font-bold px-9 group-hover:px-9 group-hover:text-white group-hover:bg-main group-hover:py-3.5 hover:rounded-full hover:px-6 transition-transform duration-3000 ">
                      Events
                    </span>
                  </Link>
                </div>
             
            </nav>
          </div>
          <div className="bg-main cursor-pointer w-14 h-14 rounded-full flex justify-center items-center">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="map/med">
                <path
                  id="Vector"
                  d="M6.375 14.1667L2.51671 12.2372C2.39907 12.1784 2.30012 12.088 2.23093 11.9762C2.16175 11.8644 2.12507 11.7355 2.125 11.604V3.97946C2.12506 3.85876 2.15597 3.74009 2.21478 3.63469C2.27359 3.5293 2.35835 3.44067 2.46103 3.37724C2.56371 3.3138 2.68089 3.27765 2.80146 3.27222C2.92203 3.26679 3.04199 3.29226 3.14996 3.34621L6.375 4.95837M6.375 14.1667V4.95837M6.375 14.1667L10.625 12.0417M6.375 4.95837L10.625 2.83337M10.625 12.0417L13.85 13.6539C13.958 13.7078 14.078 13.7333 14.1985 13.7279C14.3191 13.7224 14.4363 13.6863 14.539 13.6228C14.6416 13.5594 14.7264 13.4708 14.7852 13.3654C14.844 13.26 14.8749 13.1413 14.875 13.0206V5.39612C14.8749 5.26461 14.8382 5.13572 14.7691 5.02388C14.6999 4.91203 14.6009 4.82166 14.4833 4.76287L10.625 2.83337M10.625 12.0417V2.83337"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
          <div className="bg-main cursor-pointer w-14 h-14 rounded-full flex justify-center items-center">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.66667 10.8333H8.6775M13 10.8333H13.0108M17.3333 10.8333H17.3442M9.75 17.3333H5.41667C4.84203 17.3333 4.29093 17.105 3.8846 16.6987C3.47827 16.2924 3.25 15.7413 3.25 15.1666V6.49998C3.25 5.92534 3.47827 5.37424 3.8846 4.96791C4.29093 4.56159 4.84203 4.33331 5.41667 4.33331H20.5833C21.158 4.33331 21.7091 4.56159 22.1154 4.96791C22.5217 5.37424 22.75 5.92534 22.75 6.49998V15.1666C22.75 15.7413 22.5217 16.2924 22.1154 16.6987C21.7091 17.105 21.158 17.3333 20.5833 17.3333H15.1667L9.75 22.75V17.3333Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
