import { __ApiResourceClient } from "..";
import { PeriodApiResponse } from "../../../types/api/Period";

const Periods = {
	getPeriods: () => {
		return new Promise<string[]>((resolve, reject) => {
			__ApiResourceClient.get<PeriodApiResponse>("/models/periods")
				.then((response) => {
					const periodList = response.data.periods.map((period) => {
						return period.option;
					});
					resolve(periodList);
				}).catch((error) => {
					reject(error);
				});
		});
	},
};

export default Periods;