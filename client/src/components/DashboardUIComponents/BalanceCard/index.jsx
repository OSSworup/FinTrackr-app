import { useSpring, animated } from '@react-spring/web';
import { useEffect } from 'react';



function BalanceCard({balance,isLoading,data}) {
  const date = new Date().toLocaleDateString();
  const [styles,api]=useSpring(()=>({val:0,config:{tension:200,friction:25}}))

  useEffect(()=>{
    api.start({val:Number(balance)});
  },[balance]);

  if(isLoading) return <div>Loading...</div>
  if (!data || !data.transactions) return <div>No data available</div>;

  return (
    <div className="bg-white border-l-4 border border-green-600 rounded-md p-5 shadow-sm">
      <h1 className="text-sm text-grey-500 font-medium tracking-wide mb-1">Total Balance</h1>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-semibold text-gray-700">₹</span>
        <animated.span className="text-3xl text-gray-900 font-bold">{styles.val.to((val)=> val.toFixed(2))}</animated.span>
      </div>
      <p className="text-xs text-gray-400 mt-1">As of {date}</p>
    </div>
  );
}

export default BalanceCard;