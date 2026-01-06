import { useEffect, useState } from "react";
import type { Submission } from "../../../../../../types/task";
import { submissionsURL } from "../../../../../../constants/urls/backend";

const Submissions = ({ taskId }: { taskId: string }) => {
  const [history, setHistory] = useState<Submission[]>([]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`${submissionsURL}/${taskId}`, {
        credentials: "include",
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch submission history ${response.ok}`);
      }

      const data: { submissions: Submission[] } = await response.json();
      setHistory(data.submissions);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSubmissions();
  }, []);
  return (
    <div className="w-full">
      <h3>Submissions {history.length}</h3>
      <hr />

      {history.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Submission ID</th>
                <th>Task ID</th>
                <th>Submitted on</th>
                <th>Verified By</th>
                <th>Verified On</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {history.map((ele, idx) => (
                <tr key={idx}>
                  <td>{ele.testId}</td>
                  <td>{ele.taskId}</td>
                  <td>{ele.submittedOn}</td>
                  <td>{ele.adminId}</td>
                  <td>{ele.verifiedOn}</td>
                  <td>{ele.isFailed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Submissions;
