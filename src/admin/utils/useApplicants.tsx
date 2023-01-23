import axios from "axios";
import useSWR from "swr";

import { Applicant, uid } from "./useApplicant";

export interface Applicants {
	[index: uid]: Applicant;
}

const fetcher = async (url: string) => {
	const res = await axios.get<Applicant[]>(url);
	return res.data;
};

function useApplicants() {
	const { data, error, isLoading } = useSWR<Applicant[]>(
		"/api/admin/applicants",
		fetcher
	);

	return { applicantList: data, loading: isLoading, error };
}

export default useApplicants;
