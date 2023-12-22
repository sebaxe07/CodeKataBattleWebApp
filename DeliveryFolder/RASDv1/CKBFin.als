// Represents a tournament with an owner (an educator) and a set of invited educators
sig Tournament {
	owner: one Educator,
	invited: set Educator,
} {
	no e: Educator | e in invited && e = owner
}

// Represents a battle with an owner (an educator), associated with a tournament,
// and defines minimum and maximum team sizes for the battle
sig Battle {
	ownedBy: one Educator,
	PartOfTournament: one Tournament,
	minTeamSize: one Int,  // Minimum team size for the tournament
	maxTeamSize: one Int,   // Maximum team size for the tournament
} {
	minTeamSize >= 1 && maxTeamSize <= 5 // Ensure reasonable limits
}

// Represents a user (abstract)
abstract sig User {}

// Represents a student who is part of a team, subscribed to tournaments, and has tournament scores
sig Student extends User {
	partOfTeam: set Team,
	subscribedTo: set Tournament,
	tournamentScore: set TournamentScore
} {
	#tournamentScore = #subscribedTo
}

// Represents an educator who owns battles and tournaments
sig Educator extends User {
	ownBattle: set Battle,
	ownTournaments: set Tournament,
}

// Represents a team with students, associated with battles, and having team scores
// Limits the amount of students based on the battle settings
sig Team {
	students: some Student,
	isInBattles: one Battle,
	teamScore: one Score,
}{
	#students >= isInBattles.minTeamSize  // Minimum team size based on Battle settings
	#students <= isInBattles.maxTeamSize  // Maximum team size based on Battle settings
}

// Represents a score associated with a team, battle, and student(s)
sig Score {
	associatedTeam: one Team,
	associatedBattle: one Battle,
	studentScore: some Student
}

// Represents a tournament score associated with a tournament and a student
sig TournamentScore {
	tournament: one Tournament,
	associatedStudent: one Student
}

// Fact ensuring the student tournament score is associated with the tournament the student is subscribed to
fact TournamentScoreMatchesSubscribedTournament {
	all ts: TournamentScore |
		ts in ts.associatedStudent.tournamentScore implies
		some t: ts.associatedStudent.subscribedTo |
		ts.tournament = t
}

// Fact ensuring unique association between students and tournament scores 
fact TournamentAndStudentUnique {
	associatedStudent =~tournamentScore
}

// Fact ensuring uniqueness of TournamentScore for each student and tournament 
//(i.e. each student has only one tournament score per tournament)
fact UniqueTournamentScorePerStudentPerTournament {
	all t: Tournament, s: Student |
		lone { ts: TournamentScore | ts.tournament = t && ts.associatedStudent = s }
}

// Fact ensuring students are subscribed to tournaments they are part of the team in battles 
//(i.e. students are subscribed to tournaments they are competing in)
fact LinkSubscribedToTournaments {
	all s: Student, t: Tournament |
		t in s.partOfTeam.isInBattles.PartOfTournament implies t in s.subscribedTo
}

// Fact ensuring teams and students have a unique relationship 
fact teamStudentUnique {
	partOfTeam =~students
}

// Fact ensuring scores are correctly associated with teams and battles 
//(i.e. scores are associated with the correct team and battle)
fact TeamScoresAssociatedWithBattle {
	all t: Team, s: Score, b: Battle |
		s in t.teamScore && t.isInBattles = b implies s.associatedTeam = t && s.associatedBattle = b
}

// Fact ensuring students are correctly linked to their scores 
//(i.e. students are linked to the correct scores)
fact StudentsLinkedToScores {
	all t: Team, sc: Score, s: Student |
		sc in t.teamScore && s in t.students implies s in sc.studentScore
}

// Fact ensuring teams are correctly linked to battles 
fact TeamsLinkedToBattles {
	all s: Score | s.associatedTeam.isInBattles = s.associatedBattle
}

// Fact ensuring unique team scores 
//(i.e. each team has only one score)
fact UniqueTeamScores {
	teamScore = ~associatedTeam
}

// Fact ensuring unique tournament, battle ownership 
//(i.e. each tournament, and battle has only one owner)
fact UniqueTournamentBattleOwnership {
	ownTournaments = ~owner
	ownBattle = ~ownedBy
}

// Fact ensuring battles are part of tournaments owned or invited by educators 
//(i.e. battles can only be part of the tournament if the owner of the battle is the owner of the tournament or is invited to the tournament)
fact BattlePartOfTournament {
	all b: Battle | 
		let t = b.PartOfTournament |
			(b.ownedBy in t.owner) or (b.ownedBy in t.invited)
}

// Fact ensuring each student belongs to only one team per battle
// (i.e. each student can only be part of one team per battle)
fact EachStudentInOneTeamPerBattle {
	all disj t1, t2: Team, s: Student |
		s in t1.students && s in t2.students && t1.isInBattles = t2.isInBattles implies t1 = t2
}


// Predicate showing a possible scenario with at least 5 students, 3 tournaments and 4 battles
pred show [] {    
	#Battle = 4
	#Tournament = 3
	#Student = 5
}

// Predicate ensuring that there are at least two battles with different team sizes
pred opt1 [] {    
	some b1, b2: Battle | b1 != b2 && b1.minTeamSize = 3 && b1.maxTeamSize = 4 && b2.minTeamSize = 2 && b2.maxTeamSize = 5
	#Tournament = 2
	#Student = 5
}

run show for 10

// Assertion proving (by counterexample) that there can be at least two students in the same team in the same tournament
assert NoTwoStudentsConnectedToTournament  {
	no t: Tournament |
		some disj s1, s2: Student, team: Team |
			s1 in team.students && s2 in team.students && s1 != s2 && team.isInBattles.PartOfTournament = t
}

check NoTwoStudentsConnectedToTournament  for 5


