import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';
import {fetchRevenue} from '@/app/lib/data';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
  const revenue = await fetchRevenue();
  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="revenue-chart-empty">No data available.</p>;
  }

  return (
    <div className="revenue-chart-wrapper">
      <h2 className={`${lusitana.className} revenue-chart-title`}>
        Recent Revenue
      </h2>

      <div className="revenue-chart-card">
        <div className="revenue-chart-container">
          <div
            className="revenue-chart-yaxis"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="revenue-chart-month">
              <div
                className="revenue-chart-bar"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="revenue-chart-month-label">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="revenue-chart-footer">
          <CalendarIcon className="revenue-chart-icon" />
          <h3 className="revenue-chart-footer-text">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}