import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "./badge";

const PastTreks = () => {
  const pastTreks = [
    { id: 1, name: "Mount Everest Base Camp", hash: "#EverestBase2023" },
    { id: 2, name: "Inca Trail to Machu Picchu", hash: "#IncaTrail2022" },
    { id: 3, name: "Kilimanjaro Summit", hash: "#KilimanjaroSummit2021" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Past Treks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {pastTreks.map((trek) => (
            <li key={trek.id} className="flex items-center justify-between">
              <span>{trek.name}</span>
              {/* <Badge variant="secondary">{trek.hash}</Badge> */}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PastTreks;