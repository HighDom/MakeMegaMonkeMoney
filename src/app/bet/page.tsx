import ActiveBets from "@/components/Bet/ActiveBets";
import Bet2 from "@/components/Bet/Bet2";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const activeBets = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Bet2 />
      </div>
    </DefaultLayout>
  );
};

export default activeBets;
