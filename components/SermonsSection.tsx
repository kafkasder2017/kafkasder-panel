import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Search, Play, Download, Upload, Calendar, Clock, BookOpen } from "lucide-react";

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  speakerAvatar?: string;
  series: string;
  scripture: string;
  date: string;
  duration: string;
  description: string;
  audioUrl?: string;
  videoUrl?: string;
  transcriptUrl?: string;
  downloads: number;
  views: number;
}

export function SermonsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("all");

  const sermons: Sermon[] = [
    {
      id: "1",
      title: "Walking in Faith Through Trials",
      speaker: "Pastor John Smith",
      series: "Faith & Perseverance",
      scripture: "James 1:2-4",
      date: "2025-01-21",
      duration: "42 min",
      description: "Exploring how we can maintain our faith and find joy even in the midst of difficult circumstances.",
      downloads: 89,
      views: 234
    },
    {
      id: "2",
      title: "The Power of Prayer in Community",
      speaker: "Pastor Sarah Johnson",
      series: "Prayer Life",
      scripture: "Matthew 18:19-20",
      date: "2025-01-14",
      duration: "38 min",
      description: "Understanding the importance of praying together as a church family and its impact on our spiritual growth.",
      downloads: 67,
      views: 198
    },
    {
      id: "3",
      title: "Love Your Neighbor as Yourself",
      speaker: "Pastor Michael Davis",
      series: "The Great Commandments",
      scripture: "Mark 12:28-31",
      date: "2025-01-07",
      duration: "45 min",
      description: "Practical ways to show love and compassion to those around us in our daily lives.",
      downloads: 112,
      views: 287
    },
    {
      id: "4",
      title: "Finding Hope in God's Promises",
      speaker: "Guest Speaker - Rev. Emily Wilson",
      series: "Hope & Healing",
      scripture: "Romans 15:13",
      date: "2024-12-31",
      duration: "35 min",
      description: "A New Year's message about trusting in God's promises for our future.",
      downloads: 156,
      views: 412
    },
    {
      id: "5",
      title: "The Christmas Gift of Salvation",
      speaker: "Pastor John Smith",
      series: "Christmas Special",
      scripture: "Luke 2:8-14",
      date: "2024-12-24",
      duration: "40 min",
      description: "Celebrating the birth of Jesus and the gift of salvation offered to all mankind.",
      downloads: 203,
      views: 534
    }
  ];

  const series = [...new Set(sermons.map(s => s.series))];

  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.scripture.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeries = selectedSeries === "all" || sermon.series === selectedSeries;
    return matchesSearch && matchesSeries;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">Sermons & Messages</h1>
          <p className="text-muted-foreground">Manage the church's sermon library and audio content</p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Sermon
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sermons, speakers, or scripture..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedSeries}
          onChange={(e) => setSelectedSeries(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background"
        >
          <option value="all">All Series</option>
          {series.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Sermons List */}
      <div className="space-y-4">
        {filteredSermons.map((sermon) => (
          <Card key={sermon.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={sermon.speakerAvatar} />
                  <AvatarFallback>{getInitials(sermon.speaker)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium mb-1">{sermon.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        by {sermon.speaker} • {formatDate(sermon.date)}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          <span>{sermon.scripture}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{sermon.duration}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="mb-3">
                        {sermon.series}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{sermon.description}</p>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" className="gap-2">
                        <Play className="h-3 w-3" />
                        Play
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 mt-4 text-xs text-muted-foreground">
                    <span>{sermon.views} views</span>
                    <span>{sermon.downloads} downloads</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSermons.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No sermons found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}