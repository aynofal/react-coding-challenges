import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import SpotifyApi from "../../../utils/api";

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };

    this.api = new SpotifyApi();
    this.initData()
  }

  async initData() {
    const newReleases = await this.api.getNewReleases()
    const playlists = await this.api.getFeaturedPlaylists()
    const categories = await this.api.getCategories()
    this.setState({
      newReleases,
      playlists,
      categories
    })
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
