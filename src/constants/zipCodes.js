/*
 * Zip codes Kelly travels to, by county, with the town each one belongs to.
 * Anything not listed gets a "not yet". A few zips cross a county line
 * (Englewood 34224, Boca Grande 33921, Alva 33920); they are included here.
 * Add or remove a zip here and the checker updates everywhere.
 */
const LEE = {
  'Fort Myers': ['33901', '33902', '33905', '33906', '33907', '33908', '33911', '33912', '33913', '33916', '33919', '33965', '33966', '33967', '33994'],
  'North Fort Myers': ['33903', '33917', '33918'],
  'Cape Coral': ['33904', '33909', '33910', '33914', '33915', '33990', '33991', '33993'],
  'Lehigh Acres': ['33936', '33970', '33971', '33972', '33973', '33974', '33976'],
  'Bonita Springs': ['34133', '34134', '34135', '34136'],
  Estero: ['33928', '33929'],
  'Fort Myers Beach': ['33931', '33932'],
  Sanibel: ['33957'],
  Captiva: ['33924'],
  'Boca Grande': ['33921'],
  'Pine Island': ['33922', '33945', '33956'],
  Alva: ['33920'],
};

const COLLIER = {
  Naples: ['34101', '34102', '34103', '34104', '34105', '34106', '34107', '34108', '34109', '34110', '34112', '34113', '34114', '34116', '34117', '34119', '34120'],
  'Marco Island': ['34145', '34146'],
  Goodland: ['34140'],
  'Immokalee and Ave Maria': ['34142', '34143'],
  'Everglades City': ['34137', '34138', '34139', '34141'],
};

const CHARLOTTE = {
  'Port Charlotte': ['33948', '33949', '33952', '33953', '33954', '33981'],
  'Punta Gorda': ['33950', '33951', '33955', '33980', '33982', '33983'],
  'Rotonda West': ['33947'],
  Placida: ['33946'],
  Englewood: ['34224'],
  'El Jobean and Murdock': ['33927', '33938'],
};

const COUNTIES = [
  ['Lee County', LEE],
  ['Collier County', COLLIER],
  ['Charlotte County', CHARLOTTE],
];

/** zip -> { town, county } */
export const ZIP_AREAS = new Map(
  COUNTIES.flatMap(([county, towns]) =>
    Object.entries(towns).flatMap(([town, zips]) => zips.map((zip) => [zip, { town, county }])),
  ),
);
